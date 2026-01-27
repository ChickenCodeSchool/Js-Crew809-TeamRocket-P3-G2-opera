import type { RequestHandler } from "express";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const createCheckoutSession: RequestHandler = async (req, res) => {
  try {
    const { items, customer_id } = req.body;

    const lineItems = items.map(
      (item: {
        name: string;
        price: number;
        quantity: number;
        image_url: string;
      }) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: item.name,
            images: [item.image_url],
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
      success_url: `${process.env.CLIENT_URL}/orders?payment=success`,
      cancel_url: `${process.env.CLIENT_URL}/panier`,
      metadata: {
        customer_id: customer_id || "guest",
      },
    });

    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Erreur Stripe:", error);
    res.status(500).json({ error: "Erreur création session paiement" });
  }
};

export default {
  createCheckoutSession,
};
