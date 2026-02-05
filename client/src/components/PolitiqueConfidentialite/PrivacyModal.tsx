import "./PrivacyModal.css";

type PrivacyModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <button
      type="button"
      className="privacy_modal_overlay"
      onClick={onClose}
      aria-label="Fermer la modal de politique de confidentialité"
    >
      <div className="privacy_modal_content">
        <h2>Politique de confidentialité – OPERA</h2>

        <div className="privacy_modal_body">
          <p>
            Chez OPERA, nous prenons très au sérieux la confidentialité et la
            sécurité de vos données personnelles. Lorsque vous utilisez notre
            site e-commerce pour acheter des produits de luxe, nous collectons
            uniquement les informations nécessaires pour gérer votre compte, vos
            commandes et améliorer votre expérience.
          </p>

          <p>
            Vos données personnelles, telles que votre nom, prénom, adresse
            e-mail, adresse postale et informations de paiement, sont traitées
            conformément aux lois applicables sur la protection des données.
            Nous ne partageons vos informations avec des tiers qu’avec votre
            consentement explicite ou lorsque cela est nécessaire pour la
            réalisation de vos commandes.
          </p>

          <p>
            Vous avez le droit d’accéder à vos données, de les rectifier, de
            demander leur suppression ou de limiter leur traitement. Pour
            exercer ces droits, contactez notre service client à{" "}
            <a href="mailto:privacy@opera-luxury.com">
              opera.messagerie@gmail.com
            </a>
            .
          </p>

          <p>
            Nous utilisons également des cookies et technologies similaires pour
            personnaliser votre expérience, analyser le trafic et améliorer nos
            services. Vous pouvez gérer vos préférences de cookies à tout moment
            via notre site.
          </p>

          <p>
            En créant un compte ou en achetant sur OPERA, vous acceptez le
            traitement de vos données personnelles tel que décrit dans cette
            politique.
          </p>
        </div>

        <button type="button" className="privacy_modal_close" onClick={onClose}>
          Fermer
        </button>
      </div>
    </button>
  );
};

export default PrivacyModal;
