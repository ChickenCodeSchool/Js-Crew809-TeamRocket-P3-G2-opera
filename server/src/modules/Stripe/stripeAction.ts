// import type { RequestHandler } from "express";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// export const createCheckoutSession: RequestHandler = async (req, res) => {
//   try {
//     const { items, customer_id } = req.body;

//     const lineItems = items.map(
//       (item: {
//         name: string;
//         price: number;
//         quantity: number;
//         image_url: string;
//       }) => ({
//         price_data: {
//           currency: "eur",
//           product_data: {
//             name: item.name,
//             images: [item.image_url],
//           },
//           unit_amount: Math.round(item.price * 100),
//         },
//         quantity: item.quantity || 1,
//       }),
//     );

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: lineItems,
//       mode: "payment",
//       success_url: `${process.env.CLIENT_URL}/orders?payment=success`,
//       cancel_url: `${process.env.CLIENT_URL}/panier`,
//       metadata: {
//         customer_id: customer_id || "guest",
//       },
//     });

//     res.json({ sessionId: session.id, url: session.url });
//   } catch (error) {
//     console.error("Erreur Stripe:", error);
//     res.status(500).json({ error: "Erreur création session paiement" });
//   }
// };

// export default {
//   createCheckoutSession,
// };

import type { RequestHandler } from "express";
import Stripe from "stripe";
import database from "../../../database/client";
import type { Rows } from "../../../database/client";
import { sendOrderConfirmationEmail } from "../../../utils/emailconfirmation";
import orderItemRepository from "../order/orderItemRepository";
import orderRepository from "../order/orderRepository";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const createCheckoutSession: RequestHandler = async (req, res) => {
  try {
    const { items, customer_id } = req.body;

    const lineItems = items.map(
      (item: {
        name: string;
        price: number;
        quantity: number;
        size_label?: string;
      }) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: `${item.name}${item.size_label ? ` - Taille: ${item.size_label}` : ""}`,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity || 1,
      }),
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/panier`,
      metadata: {
        customer_id: String(customer_id), // ← Convertir en string
        items: JSON.stringify(items),
      },
    });

    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Erreur Stripe:", error);
    res.status(500).json({ error: "Erreur création session paiement" });
  }
};

export const verifyPayment: RequestHandler = async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      res.status(400).json({ error: "Session ID manquant" });
      return;
    }

    console.log("🔍 Vérification paiement pour session:", sessionId);

    // ✅ NOUVEAU : Vérifier si la commande existe déjà pour cette session
    const [existingOrders] = await database.query<Rows>(
      "SELECT order_id FROM `order` WHERE stripe_session_id = ?",
      [sessionId],
    );

    if (existingOrders.length > 0) {
      console.log(
        "⚠️ Commande déjà créée pour cette session:",
        existingOrders[0].order_id,
      );

      // Récupérer les détails de la commande existante
      const orderDetails = await orderRepository.readWithDetails(
        existingOrders[0].order_id,
      );

      res.json({ success: true, order: orderDetails });
      return;
    }

    // Récupérer la session Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    console.log("💳 Payment status:", session.payment_status);
    console.log("👤 Metadata customer_id:", session.metadata?.customer_id);

    if (session.payment_status !== "paid") {
      res.status(400).json({ error: "Paiement non confirmé" });
      return;
    }

    const customerIdString = session.metadata?.customer_id;

    if (
      !customerIdString ||
      customerIdString === "guest" ||
      customerIdString === "undefined"
    ) {
      res
        .status(400)
        .json({ error: "ID client manquant. Veuillez vous connecter." });
      return;
    }

    const customerId = Number(customerIdString);

    if (Number.isNaN(customerId)) {
      console.error("❌ Customer ID invalide:", customerIdString);
      res.status(400).json({ error: "ID client invalide" });
      return;
    }

    console.log("✅ Customer ID valide:", customerId);

    const items = JSON.parse(session.metadata?.items || "[]");

    console.log("📦 Items:", items);

    const totalAmount = items.reduce(
      (sum: number, item: { price: number; quantity: number }) =>
        sum + item.price * item.quantity,
      0,
    );

    console.log("💰 Total amount:", totalAmount);

    // Créer la commande dans la base de données
    const orderId = await orderRepository.create({
      customer_id: customerId,
      price_total: totalAmount,
      status: "confirmed",
      stripe_session_id: sessionId,
    });

    console.log("✅ Commande créée avec ID:", orderId);

    // Créer les order_items
    for (const item of items) {
      await orderItemRepository.create({
        order_id: orderId,
        product_id: item.product_id,
        size_id: item.size_id || null,
        quantity: item.quantity,
        unit_price: item.price,
      });
    }

    console.log("✅ Items de commande créés");

    // Récupérer les détails complets de la commande
    const orderDetails = await orderRepository.readWithDetails(orderId);

    if (!orderDetails) {
      res.status(500).json({ error: "Erreur récupération commande" });
      return;
    }

    console.log("✅ Détails commande récupérés");

    // Envoyer l'email de confirmation
    try {
      await sendOrderConfirmationEmail(orderDetails);
      console.log("✅ Email de confirmation envoyé");
    } catch (emailError) {
      console.error("⚠️ Erreur envoi email:", emailError);
      // On continue même si l'email échoue
    }

    res.json({ success: true, order: orderDetails });
  } catch (error) {
    console.error("❌ Erreur vérification paiement:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export default {
  createCheckoutSession,
  verifyPayment,
};
