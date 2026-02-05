import nodemailer from "nodemailer";

// Configuration du transporteur
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Interface pour les données du mail de bienvenue
interface WelcomeEmailData {
  to: string;
  firstname: string;
}

// Fonction d'envoi du mail de bienvenue
export const sendWelcomeEmail = async (
  data: WelcomeEmailData,
): Promise<void> => {
  const { to, firstname } = data;

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
          .welcome-box { background-color: #fff; padding: 15px; margin: 20px 0; border-radius: 5px; }
          .benefits { background-color: #fff; padding: 20px; margin: 20px 0; border-radius: 5px; }
          .benefits ul { list-style: none; padding: 0; }
          .benefits li { padding: 10px 0; border-bottom: 1px solid #eee; }
          .benefits li:last-child { border-bottom: none; }
          .benefits li:before { content: "✓ "; color: #000; font-weight: bold; margin-right: 10px; }
          .cta-button { 
            display: inline-block; 
            background-color: #000; 
            color: #fff; 
            padding: 15px 30px; 
            text-decoration: none; 
            border-radius: 5px; 
            margin: 20px 0;
            font-weight: bold;
          }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✓ Bienvenue chez OPERA</h1>
          </div>
          
          <div class="content">
            <p>Bonjour ${firstname},</p>
            
            <div class="welcome-box">
              <p style="font-size: 16px; margin: 0;">
                <strong>Votre compte a été créé avec succès !</strong>
              </p>
            </div>
            
            <p>Nous sommes ravis de vous accueillir parmi nous. Vous faites maintenant partie de la communauté OPERA.</p>
            
            <div class="benefits">
              <h2 style="margin-top: 0;">Vos avantages</h2>
              <ul>
                <li>Accès à toute notre collection de vêtements</li>
                <li>Commande en toute sécurité</li>
                <li>Suivi de vos commandes en temps réel</li>
                <li>Offres et nouveautés en avant-première</li>
                <li>Historique de vos achats</li>
              </ul>
            </div>
            
            <div style="text-align: center;">
              <a href="${process.env.FRONT_URL || "http://localhost:3000"}" class="cta-button">
                Découvrir la collection
              </a>
            </div>
            
            <p>Si vous avez des questions, notre équipe est à votre disposition.</p>
            
            <p>À très bientôt,<br>
            <strong>L'équipe OPERA</strong></p>
          </div>
          
          <div class="footer">
            <p>Cet email a été envoyé automatiquement, merci de ne pas y répondre.</p>
            <p>© ${new Date().getFullYear()} OPERA. Tous droits réservés.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"OPERA" <${process.env.MAIL_USER}>`,
    to,
    subject: "Bienvenue chez OPERA ! Votre compte est créé",
    html: emailHTML,
  });

  console.log(`✅ Email de bienvenue envoyé à ${to}`);
};

// Fonction pour vérifier la configuration
export const verifyEmailConfig = async (): Promise<boolean> => {
  try {
    await transporter.verify();
    console.log("✅ Serveur email prêt à envoyer des messages");
    return true;
  } catch (error) {
    console.error("❌ Erreur de configuration email:", error);
    return false;
  }
};
