import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function CheckoutSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      // TODO: Vider le panier et créer la commande en BDD
      console.log("Paiement réussi, session:", sessionId);
    }
  }, [sessionId]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>✅ Paiement réussi !</h1>
      <p>Merci pour votre commande.</p>
      <button
        type="button"
        onClick={() => navigate("/")}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "black",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Retour à l'accueil
      </button>
    </div>
  );
}
