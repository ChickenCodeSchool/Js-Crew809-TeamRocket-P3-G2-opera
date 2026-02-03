import nodemailer from "nodemailer";

type OrderDetails = {
  order_id: number;
  order_number: string;
  total_amount: number;
  created_at: string;
  items: Array<{
    product_name: string;
    quantity: number;
    price: number | string; // ← Peut être string ou number
    size_label?: string;
  }>;
  customers: {
    firstname: string;
    lastname: string;
    mail: string;
    adress?: string;
    postal_code?: string;
    country?: string;
    phone?: string;
  };
};

// Configuration du transporteur email
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendOrderConfirmationEmail = async (order: OrderDetails) => {
  try {
    const itemsHTML = order.items
      .map((item) => {
        // ✅ Convertir price en nombre
        const price =
          typeof item.price === "string"
            ? Number.parseFloat(item.price)
            : item.price;
        const unitPrice = price.toFixed(2);
        const totalPrice = (price * item.quantity).toFixed(2);

        return `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">
            ${item.product_name}${item.size_label ? ` - Taille: ${item.size_label}` : ""}
          </td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">
            ${item.quantity}
          </td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
            ${unitPrice} €
          </td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
            ${totalPrice} €
          </td>
        </tr>
      `;
      })
      .join("");

    // ✅ Convertir total_amount aussi au cas où
    const totalAmount =
      typeof order.total_amount === "string"
        ? Number.parseFloat(order.total_amount)
        : order.total_amount;

    const emailHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #000; color: #fff; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .order-info { background-color: #fff; padding: 15px; margin: 20px 0; border-radius: 5px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th { background-color: #f0f0f0; padding: 10px; text-align: left; }
            .total { font-size: 18px; font-weight: bold; text-align: right; padding: 15px 0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✓ Commande confirmée</h1>
            </div>
            
            <div class="content">
              <p>Bonjour ${order.customers.firstname} ${order.customers.lastname},</p>
              
              <p>Merci pour votre commande ! Nous avons bien reçu votre paiement et votre commande est confirmée.</p>
              
              <div class="order-info">
                <p><strong>Numéro de commande :</strong> ${order.order_number}</p>
                <p><strong>Date :</strong> ${new Date(order.created_at).toLocaleDateString("fr-FR")}</p>
              </div>
              
              <h2>Détails de la commande</h2>
              <table>
                <thead>
                  <tr>
                    <th>Article</th>
                    <th style="text-align: center;">Quantité</th>
                    <th style="text-align: right;">Prix unitaire</th>
                    <th style="text-align: right;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHTML}
                </tbody>
              </table>
              
              <div class="total">
                Total : ${totalAmount.toFixed(2)} €
              </div>
              
              <div class="order-info">
                <h3>Adresse de livraison</h3>
                <p>
                  ${order.customers.firstname} ${order.customers.lastname}<br>
                  ${order.customers.adress}<br>
                  ${order.customers.postal_code} ${order.customers.country}<br>
                  ${order.customers.phone ? `Tél : ${order.customers.phone}` : ""}
                </p>
              </div>
              
              <p>Votre commande sera expédiée dans les plus brefs délais. Vous recevrez un email de confirmation dès l'expédition de votre colis.</p>
              
              <p>Merci pour votre confiance !</p>
            </div>
            
            <div class="footer">
              <p>Cet email a été envoyé automatiquement, merci de ne pas y répondre.</p>
              <p>© ${new Date().getFullYear()} Votre Boutique. Tous droits réservés.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"Votre Boutique OPERA" <${process.env.SMTP_USER}>`,
      to: order.customers.mail,
      subject: `Confirmation de commande ${order.order_number}`,
      html: emailHTML,
    });

    console.log(`✅ Email envoyé à ${order.customers.mail}`);
  } catch (error) {
    console.error("❌ Erreur envoi email:", error);
    throw error;
  }
};
