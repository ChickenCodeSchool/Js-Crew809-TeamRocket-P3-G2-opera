import { Link, useLocation } from "react-router-dom";
import BrandDescription from "../../components/brandDescription/BrandDescription";

function PageTestLink() {
  const location = useLocation();

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f4f4f4",
        paddingTop: "100px",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontFamily: "Bodoni Moda SC",
          fontSize: "3rem",
          marginBottom: "20px",
        }}
      >
        Page Test Link
      </h1>

      <BrandDescription />

      <p
        style={{
          fontFamily: "Montserrat",
          fontSize: "1.2rem",
          marginBottom: "40px",
        }}
      >
        Le lien fonctionne ! <br />
        <span style={{ fontWeight: "bold", color: "#dfa668" }}>
          {location.pathname}
        </span>
      </p>

      <Link
        to="/"
        style={{
          padding: "15px 30px",
          backgroundColor: "black",
          color: "white",
          textDecoration: "none",
          fontFamily: "Montserrat",
          fontWeight: "bold",
          borderRadius: "5px",
        }}
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}

export default PageTestLink;
