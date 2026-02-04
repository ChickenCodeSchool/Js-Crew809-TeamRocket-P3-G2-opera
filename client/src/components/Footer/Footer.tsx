import { useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const [openSection, setOpenSection] = useState<string | null>("help");

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="footer" data-nav-theme="light">
      <footer className="bg_footer">
        <h1 className="title_footer">
          Recevez des informations exclusives sur le lancement de chaque
          collection, des informations personnalisées à vos besoins.
        </h1>

        <div className="footer_columns">
          {/* Colonne 1 - Besoin d'aide + Service Opéra */}
          <div className="column">
            <div className="column_section">
              <button
                type="button"
                className="column_header"
                onClick={() => toggleSection("help")}
              >
                <h2>BESOIN D'AIDE ?</h2>
                <span
                  className={`icon ${openSection === "help" ? "open" : ""}`}
                >
                  +
                </span>
              </button>
              <div
                className={`column_content ${
                  openSection === "help" ? "open" : ""
                }`}
              >
                <Link to="/nouscontacter">Nous contacter</Link>
                <Link to="#">Ma commande</Link>
                <Link to="#">Foire aux questions</Link>
              </div>
            </div>

            <div className="column_section">
              <button
                type="button"
                className="column_header"
                onClick={() => toggleSection("service")}
              >
                <h2>SERVICE OPÉRA</h2>
                <span
                  className={`icon ${openSection === "service" ? "open" : ""}`}
                >
                  +
                </span>
              </button>
              <div
                className={`column_content ${
                  openSection === "service" ? "open" : ""
                }`}
              >
                <Link to="#">Découvrez nos services</Link>
                <Link to="#">Prendre Rendez-vous</Link>
              </div>
            </div>
          </div>

          <div className="column">
            <button
              type="button"
              className="column_header"
              onClick={() => toggleSection("info")}
            >
              <h2>INFORMATIONS SUR LA SOCIÉTÉ</h2>
              <span className={`icon ${openSection === "info" ? "open" : ""}`}>
                +
              </span>
            </button>
            <div
              className={`column_content ${
                openSection === "info" ? "open" : ""
              }`}
            >
              <Link to="#">À propos de Opéra</Link>
              <Link to="/general-terms">Conditions générales de vente</Link>
              <Link to="/privacy-polity">Politique de Confidentialité</Link>
            </div>
          </div>

          <div className="column column_newsletter">
            <h2>INSCRIVEZ-VOUS POUR SUIVRE L'ACTUALITÉ D'OPÉRA</h2>
            <input type="email" placeholder="Insérer votre adresse e-mail" />
            <p className="small_text">
              En cliquant sur "Envoyer", vous confirmez que vous avez lu et
              compris notre Politique de Confidentialité et que vous souhaitez
              recevoir la newsletter et d'autres communications marketing.
            </p>
          </div>
        </div>

        <h1 className="logo_footer">OPÉRA</h1>
      </footer>
    </div>
  );
}

export default Footer;
