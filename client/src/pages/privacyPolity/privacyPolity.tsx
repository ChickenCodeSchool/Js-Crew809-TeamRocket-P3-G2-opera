import imageopera from "../../assets/images/imageopera.jpg";
import "./privacyPolity.css";
function PrivacyPolity() {
  return (
    <>
      <div className="hero-container-order">
        <img src={imageopera} alt="Hero" className="mini-hero-order" />
      </div>
      <div className="privacy-page">
        <div className="privacy-container">
          <header className="privacy-header">
            <h1 className="privacy-title">Politique de Confidentialité</h1>
            <div className="privacy-meta">
              <span>OPERA</span>
              <span className="separator">•</span>
              <span>Dernière mise à jour : 24 Janvier 2025</span>
            </div>
          </header>

          <div className="privacy-content">
            <p className="privacy-intro">
              OPERA (« nous », « notre » ou « nos ») accorde une importance
              primordiale à la confidentialité et à la sécurité de vos
              informations personnelles. Dans un monde numérique en constante
              évolution, la confiance de nos clients est notre actif le plus
              précieux. Cette Politique de Confidentialité a pour objet de vous
              informer de manière transparente sur la manière dont nous
              collectons, utilisons, traitons et protégeons vos données
              personnelles lorsque vous visitez notre site internet ou effectuez
              des achats au sein de nos collections.
            </p>

            <section className="privacy-section">
              <h2 className="privacy-subtitle">1. CHAMP D'APPLICATION</h2>
              <p>
                La présente politique s'applique à l'ensemble des utilisateurs
                de notre plateforme numérique et à nos clients internationaux.
                En accédant à nos services, vous reconnaissez avoir pris
                connaissance des pratiques décrites ci-après. OPERA s'engage à
                respecter les dispositions du Règlement Général sur la
                Protection des Données (RGPD) ainsi que les législations locales
                applicables en matière de protection de la vie privée.
              </p>
            </section>

            <section className="privacy-section">
              <h2 className="privacy-subtitle">
                2. LES DONNÉES QUE NOUS COLLECTONS
              </h2>
              <p>
                Dans le cadre de votre relation avec OPERA, nous sommes amenés à
                collecter différentes catégories de données personnelles,
                directement auprès de vous ou automatiquement lors de votre
                navigation :
              </p>
              <ul className="privacy-list">
                <li>
                  <strong>Données d'identification et de contact :</strong>{" "}
                  Civilité, nom, prénom, adresse e-mail, numéro de téléphone,
                  adresse postale de facturation et de livraison.
                </li>
                <li>
                  <strong>Données transactionnelles :</strong> Détails des
                  produits achetés, historique de commandes, numéros de
                  commande, et informations relatives à vos retours ou échanges.
                  Notez que nous ne stockons jamais l'intégralité de vos
                  informations bancaires ; celles-ci sont traitées via des
                  prestataires de paiement sécurisés et certifiés PCI-DSS.
                </li>
                <li>
                  <strong>Données de navigation et techniques :</strong> Adresse
                  IP, type de navigateur, fuseau horaire, localisation
                  approximative, logs de connexion et parcours utilisateur sur
                  le site (via les cookies).
                </li>
                <li>
                  <strong>Données de profilage (avec consentement) :</strong>{" "}
                  Vos préférences en matière de mode, votre taille, et vos
                  interactions avec nos newsletters afin de vous proposer une
                  expérience sur mesure.
                </li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2 className="privacy-subtitle">3. FINALITÉS DU TRAITEMENT</h2>
              <p>
                Le traitement de vos données répond à des finalités déterminées,
                explicites et légitimes. Nous utilisons vos informations pour :
              </p>
              <ul className="privacy-list">
                <li>
                  <strong>Exécution du contrat :</strong> Gérer vos commandes,
                  assurer la livraison de vos produits, traiter vos paiements et
                  gérer le service après-vente.
                </li>
                <li>
                  <strong>Intérêt légitime :</strong> Améliorer nos produits et
                  services, prévenir la fraude, sécuriser notre site internet et
                  gérer nos litiges éventuels.
                </li>
                <li>
                  <strong>Marketing et Communication :</strong> Vous adresser,
                  sous réserve de votre consentement préalable, des actualités
                  sur OPERA, des invitations à des ventes privées ou des offres
                  personnalisées.
                </li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2 className="privacy-subtitle">
                4. PARTAGE ET TRANSFERT DES DONNÉES
              </h2>
              <p>
                OPERA préserve la confidentialité de vos données. Celles-ci ne
                sont accessibles qu'à notre personnel autorisé et ne sont
                transmises qu'à des partenaires de confiance strictement
                nécessaires à l'exécution de nos services :
              </p>
              <p>
                Ces tiers incluent nos prestataires logistiques (transporteurs),
                nos prestataires de paiement, nos partenaires technologiques
                (hébergement, maintenance) et nos conseils (avocats, auditeurs).
                Nous nous assurons que ces partenaires présentent des garanties
                suffisantes quant à la mise en œuvre de mesures techniques et
                organisationnelles appropriées.
              </p>
            </section>

            <section className="privacy-section">
              <h2 className="privacy-subtitle">5. CONSERVATION DES DONNÉES</h2>
              <p>
                Vos données personnelles sont conservées pendant une durée qui
                n'excède pas celle nécessaire aux finalités pour lesquelles
                elles sont traitées. À titre d'exemple, les données relatives à
                vos commandes sont conservées pendant la durée légale de 10 ans
                à titre de preuve comptable. Les données de prospection
                commerciale sont conservées pendant 3 ans à compter de votre
                dernier contact actif.
              </p>
            </section>

            <section className="privacy-section">
              <h2 className="privacy-subtitle">6. VOS DROITS ET RECOURS</h2>
              <p>
                Conformément à la réglementation en vigueur, vous disposez d'un
                droit d'accès, de rectification, d'effacement (« droit à l'oubli
                »), de limitation du traitement, de portabilité de vos données
                ainsi que d'un droit d'opposition.
              </p>
              <p>
                Pour exercer ces droits ou pour toute question relative à la
                protection de vos données, vous pouvez contacter notre Délégué à
                la Protection des Données (DPO) à l'adresse suivante :
              </p>
              <p className="privacy-contact">privacy@opera-paris.com</p>
              <p>
                Vous disposez également du droit d'introduire une réclamation
                auprès de l'autorité de contrôle compétente (la CNIL en France).
              </p>
            </section>

            <section className="privacy-section">
              <h2 className="privacy-subtitle">7. COOKIES ET TRACEURS</h2>
              <p>
                Lors de votre navigation, des cookies sont déposés sur votre
                terminal. Ces petits fichiers texte nous permettent d'analyser
                le trafic, de mémoriser vos préférences (comme la langue ou le
                panier) et de vous proposer des contenus adaptés. Vous pouvez à
                tout moment configurer vos préférences via notre gestionnaire de
                cookies accessible en bas de page.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
export default PrivacyPolity;
