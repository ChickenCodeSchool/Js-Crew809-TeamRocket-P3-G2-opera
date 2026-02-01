import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCartContext } from "../../contexts/CartContext";
import "./OrderConfirmation.css";

type OrderDetails = {
  order_id: number;
  order_number: string;
  total_amount: number;
  created_at: string;
  items: Array<{
    product_name: string;
    quantity: number;
    price: number;
    size_label?: string;
    image_url?: string;
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

function OrderConfirmation() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { clearCart } = useCartContext();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasVerifiedRef = useRef(false);

  useEffect(() => {
    if (hasVerifiedRef.current) {
      console.log("⚠️ Vérification déjà effectuée, skip");
      return;
    }
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      setError("Session invalide");
      setIsLoading(false);
      return;
    }

    hasVerifiedRef.current = true;

    const verifyPayment = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/stripe/verify-payment`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ sessionId }),
          },
        );

        if (response.ok) {
          const data = await response.json();
          console.log("📦 Données reçues:", data); // ← Debug

          // ✅ Vérifier que les données sont complètes
          if (!data.order || !data.order.customers) {
            console.error("❌ Structure de données invalide:", data);
            setError("Données de commande incomplètes");
            return;
          }

          setOrderDetails(data.order);
          await clearCart();
        } else {
          const errorData = await response.json();
          console.error("❌ Erreur response:", errorData);
          setError(
            errorData.error || "Erreur lors de la vérification du paiement",
          );
        }
      } catch (err) {
        console.error("❌ Erreur:", err);
        setError("Erreur serveur");
      } finally {
        setIsLoading(false);
      }
    };

    verifyPayment();
  }, [searchParams, clearCart]);

  if (isLoading) {
    return (
      <div className="order-confirmation-container">
        <div className="loading-spinner">
          <p>Vérification de votre paiement...</p>
        </div>
      </div>
    );
  }

  if (error || !orderDetails) {
    return (
      <div className="order-confirmation-container">
        <div className="error-message">
          <h2>❌ Erreur</h2>
          <p>{error || "Commande introuvable"}</p>
          <button
            type="button"
            className="back-home-btn"
            onClick={() => navigate("/")}
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  // ✅ Vérification supplémentaire avant le rendu
  if (!orderDetails.customers) {
    return (
      <div className="order-confirmation-container">
        <div className="error-message">
          <h2>❌ Erreur</h2>
          <p>Informations client manquantes</p>
          <button
            type="button"
            className="back-home-btn"
            onClick={() => navigate("/")}
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  const baseUrl = import.meta.env.VITE_API_URL;

  return (
    <div className="order-confirmation-container">
      <div className="confirmation-header">
        <div className="success-icon">✓</div>
        <h1>Commande confirmée !</h1>
        <p className="confirmation-message">
          Merci pour votre commande. Un email de confirmation a été envoyé à{" "}
          <strong>{orderDetails.customers.mail}</strong>
        </p>
        <p className="order-number">
          Numéro de commande : <strong>{orderDetails.order_number}</strong>
        </p>
      </div>

      <div className="confirmation-content">
        <div className="order-items-section">
          <h2>Détails de la commande</h2>
          <div className="order-items-list">
            {orderDetails.items.map((item) => (
              <div key={item.product_name} className="order-item">
                {item.image_url && (
                  <img
                    src={`${baseUrl}${item.image_url}`}
                    alt={item.product_name}
                    className="order-item-image"
                  />
                )}
                <div className="order-item-details">
                  <h3>{item.product_name}</h3>
                  {item.size_label && (
                    <p className="item-size">Taille : {item.size_label}</p>
                  )}
                  <p className="item-quantity">Quantité : {item.quantity}</p>
                </div>
                <div className="order-item-price">
                  € {(Number(item.price) * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="delivery-info-section">
          <h2>Adresse de livraison</h2>
          <div className="delivery-address">
            <p className="customer-name">
              {orderDetails.customers.firstname}{" "}
              {orderDetails.customers.lastname}
            </p>
            <p>{orderDetails.customers.adress}</p>
            <p>
              {orderDetails.customers.postal_code}{" "}
              {orderDetails.customers.country}
            </p>
            {orderDetails.customers.phone && (
              <p>Tél : {orderDetails.customers.phone}</p>
            )}
          </div>
        </div>

        <div className="order-total-section">
          <div className="total-row">
            <span>Livraison</span>
            <span className="free-delivery">Gratuite</span>
          </div>
          <hr />
          <div className="total-row final-total">
            <span>Total</span>
            <span>€ {Number(orderDetails.total_amount).toFixed(2)}</span>
          </div>
        </div>

        <div className="actions-section">
          <button
            type="button"
            className="back-home-btn"
            onClick={() => navigate("/")}
          >
            Continuer vos achats
          </button>
          <button
            type="button"
            className="view-orders-btn"
            onClick={() => navigate("/orders")}
          >
            Voir mes commandes
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;
