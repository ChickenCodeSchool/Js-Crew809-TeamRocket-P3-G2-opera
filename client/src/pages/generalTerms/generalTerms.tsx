import imageopera from "../../assets/images/imageopera.jpg";
import "./generalTerms.css";
function GeneralTerms() {
  return (
    <>
      <div className="hero-container-order">
        <img src={imageopera} alt="Hero" className="mini-hero-order" />
      </div>
      <div className="terms-page">
        <div className="terms-container">
          <header className="terms-header">
            <h1 className="terms-title">Conditions Générales de Vente</h1>
            <div className="terms-meta">
              <span>OPERA</span>
              <span className="separator">•</span>
              <span>Entrée en vigueur : 1er Janvier 2026</span>
            </div>
          </header>

          <div className="terms-content">
            <p className="terms-intro">
              Les présentes Conditions Générales de Vente (ci-après les « CGV »)
              régissent de manière exclusive l'ensemble des relations
              commerciales entre la société OPERA, Société par Actions
              Simplifiée au capital de 100 000 €, immatriculée au Registre du
              Commerce et des Sociétés de Paris (ci-après « La OPERA » ou « le
              Vendeur ») et toute personne physique ou morale effectuant un
              achat via le site internet opera-paris.com (ci-après « le Client
              »).
            </p>

            <section className="terms-section">
              <h2 className="terms-subtitle">
                ARTICLE 1 : OBJET ET ACCEPTATION
              </h2>
              <p>
                Les présentes CGV visent à définir les modalités de vente à
                distance entre le Vendeur et le Client, de la commande aux
                services, en passant par le paiement et la livraison. Elles
                règlent toutes les étapes nécessaires à la passation de la
                commande et assurent le suivi de cette commande entre les
                parties contractantes.
              </p>
              <p>
                Toute commande passée sur le site suppose la consultation et
                l'acceptation expresse et sans réserve des présentes CGV, sans
                toutefois que cette acceptation soit conditionnée par une
                signature manuscrite de la part du Client. La OPERA se réserve
                le droit d'adapter ou de modifier à tout moment les présentes
                CGV.
              </p>
            </section>

            <section className="terms-section">
              <h2 className="terms-subtitle">ARTICLE 2 : LES PRODUITS</h2>
              <p>
                Les produits proposés à la vente sont ceux figurant sur le site
                au jour de la consultation par le Client, dans la limite des
                stocks disponibles. La OPERA apporte le plus grand soin à la
                présentation et à la description de ses produits pour satisfaire
                l'information du Client. Toutefois, il est possible que des
                erreurs non substantielles puissent figurer sur le site, ce que
                le Client reconnaît et accepte.
              </p>
              <p>
                En cas d'indisponibilité d'un produit après passation de la
                commande, le Client en sera informé par e-mail. La commande sera
                automatiquement annulée et le Client immédiatement remboursé si
                son compte bancaire a été débité.
              </p>
            </section>

            <section className="terms-section">
              <h2 className="terms-subtitle">ARTICLE 3 : PRIX</h2>
              <p>
                Les prix de nos produits sont indiqués en Euros (€) toutes taxes
                comprises (TTC), tenant compte de la TVA applicable au jour de
                la commande. Tout changement du taux légal de TVA sera
                automatiquement répercuté sur le prix des produits présentés sur
                le site.
              </p>
              <p>
                La OPERA se réserve le droit de modifier ses prix à tout moment,
                étant toutefois entendu que le prix figurant au catalogue le
                jour de la commande sera le seul applicable au Client. Les prix
                ne comprennent pas les frais de livraison, facturés en
                supplément du prix des produits achetés suivant le montant total
                de la commande.
              </p>
            </section>

            <section className="terms-section">
              <h2 className="terms-subtitle">
                ARTICLE 4 : COMMANDE ET PAIEMENT
              </h2>
              <ul className="terms-list">
                <li>
                  <strong>Validation :</strong> La confirmation de la commande
                  entraîne acceptation des présentes CGV, la reconnaissance d'en
                  avoir parfaite connaissance et la renonciation à se prévaloir
                  de ses propres conditions d'achat. L'ensemble des données
                  fournies et la confirmation enregistrée vaudront preuve de la
                  transaction.
                </li>
                <li>
                  <strong>Paiement :</strong> Le règlement de vos achats
                  s'effectue par carte bancaire (Visa, MasterCard, American
                  Express) via notre plateforme de paiement sécurisée. Le débit
                  de la carte est effectué au moment de l'expédition de la
                  commande. En cas de refus des centres de paiement bancaire
                  concernés, la commande sera automatiquement annulée.
                </li>
                <li>
                  <strong>Réserve de propriété :</strong> Les produits demeurent
                  la propriété de la OPERA jusqu'au complet encaissement du prix
                  par notre société.
                </li>
              </ul>
            </section>

            <section className="terms-section">
              <h2 className="terms-subtitle">ARTICLE 5 : LIVRAISON</h2>
              <p>
                Les produits sont livrés à l'adresse de livraison indiquée au
                cours du processus de commande. Les délais indiqués sont des
                délais moyens habituels et correspondent aux délais de
                traitement et de livraison.
              </p>
              <p>
                La OPERA ne saurait être tenue pour responsable de retard de
                livraison en raison d'erreurs ou de perturbations imputables aux
                transporteurs (grève totale ou partielle notamment des services
                postaux et moyens de transport). En cas de colis endommagé, le
                Client s'engage à notifier au transporteur et à la OPERA toutes
                réserves dans les 3 jours suivant la réception du produit.
              </p>
            </section>

            <section className="terms-section">
              <h2 className="terms-subtitle">
                ARTICLE 6 : DROIT DE RÉTRACTATION
              </h2>
              <p>
                Conformément aux dispositions de l'article L.221-18 du Code de
                la Consommation, le Client dispose d'un délai de quatorze (14)
                jours à compter de la réception de ses produits pour exercer son
                droit de rétractation sans avoir à justifier de motifs ni à
                payer de pénalité.
              </p>
              <p>
                Les retours sont à effectuer dans leur état d'origine et
                complets (emballage, accessoires, notice, étiquette de sécurité
                intacte). Tout dommage subi par le produit à cette occasion peut
                être de nature à faire échec au droit de rétractation. Les frais
                de retour sont à la charge du Client, sauf erreur avérée de la
                part de la OPERA.
              </p>
            </section>

            <section className="terms-section">
              <h2 className="terms-subtitle">ARTICLE 7 : GARANTIES LÉGALES</h2>
              <p>
                Tous nos produits bénéficient de la garantie légale de
                conformité et de la garantie des vices cachés, prévues par les
                articles 1641 et suivants du Code civil. En cas de
                non-conformité d'un produit vendu, il pourra être retourné,
                échangé ou remboursé. Toutes les réclamations doivent
                s'effectuer par voie postale ou électronique dans le délai de 30
                jours suivant la livraison.
              </p>
            </section>

            <section className="terms-section">
              <h2 className="terms-subtitle">
                ARTICLE 8 : PROPRIÉTÉ INTELLECTUELLE
              </h2>
              <p>
                Tous les éléments du site OPERA (textes, images, sons,
                logiciels, graphisme, logo, icônes) sont et restent la propriété
                intellectuelle et exclusive de la OPERA. Nul n'est autorisé à
                reproduire, exploiter, rediffuser, ou utiliser à quelque titre
                que ce soit, même partiellement, des éléments du site.
              </p>
            </section>

            <section className="terms-section">
              <h2 className="terms-subtitle">ARTICLE 9 : DROIT APPLICABLE</h2>
              <p>
                Les présentes conditions de vente à distance sont soumises à la
                loi française. En cas de litige ou de réclamation, le Client
                s'adressera en priorité au Vendeur pour obtenir une solution
                amiable. À défaut, les tribunaux français seront seuls
                compétents.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
export default GeneralTerms;
