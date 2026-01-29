import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../contexts/CartContext";
import "./ConfirmCart.css";

type User = {
  customer_id: number;
  firstname: string;
  lastname: string;
  mail: string;
  adress?: string;
  postal_code?: string;
  country?: string;
  phone?: string;
};

function OrderSummary() {
  const { items, getTotal, isLoaded } = useCartContext();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  // Charger les infos utilisateur
  useEffect(() => {
    const loadUser = () => {
      try {
        const userStr = localStorage.getItem("user");
        if (userStr && userStr !== "undefined" && userStr !== "null") {
          const userData = JSON.parse(userStr);
          setUser(userData);
        } else {
          // Pas connecté, rediriger vers la connexion
          navigate("/auth");
        }
      } catch (error) {
        console.error("Erreur chargement user:", error);
        navigate("/auth");
      } finally {
        setIsLoadingUser(false);
      }
    };

    loadUser();
  }, [navigate]);

  const handleProceedToPayment = async () => {
    if (items.length === 0) {
      alert("Votre panier est vide");
      return;
    }

    // Vérifier que l'adresse est complète
    if (!user?.adress || !user?.postal_code || !user?.country) {
      alert("Veuillez compléter votre adresse de livraison dans votre profil");
      navigate("/profile"); // Vous pouvez créer une page profil ou rediriger ailleurs
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/stripe/create-checkout-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: items.map((item) => ({
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              size_label: item.size_label,
            })),
          }),
        },
      );

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Erreur checkout:", error);
      alert("Erreur lors du paiement");
    }
  };

  const handleEditCart = () => {
    navigate("/panier");
  };

  const baseUrl = import.meta.env.VITE_API_URL;

  if (!isLoaded || isLoadingUser) {
    return (
      <div className="order-summary-container">
        <p>Chargement...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="order-summary-container">
        <h1>Récapitulatif de commande</h1>
        <div className="empty-order">
          <p>Votre panier est vide</p>
          <button
            type="button"
            className="continue-shopping-btn"
            onClick={() => navigate("/")}
          >
            Continuer vos achats
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-summary-container">
      <h1>Récapitulatif de commande</h1>

      <div className="order-content">
        {/* Section articles */}
        <div className="order-items-section">
          <div className="section-header">
            <h2>Vos articles ({items.length})</h2>
            <button
              type="button"
              className="edit-cart-btn"
              onClick={handleEditCart}
            >
              Modifier le panier
            </button>
          </div>

          <div className="order-items-list">
            {items.map((item) => (
              <div
                key={`${item.product_id}-${item.size_id}`}
                className="order-item"
              >
                <img
                  src={`${baseUrl}${item.image_url}`}
                  alt={item.name}
                  className="order-item-image"
                />
                <div className="order-item-details">
                  <h3>{item.name}</h3>
                  {item.size_label && (
                    <p className="item-size">Taille : {item.size_label}</p>
                  )}
                  <p className="item-quantity">Quantité : {item.quantity}</p>
                </div>
                <div className="order-item-price">
                  {Number(item.price).toFixed(2)} €
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section adresse de livraison */}
        <div className="delivery-section">
          <h2>Adresse de livraison</h2>
          {user?.adress && user?.postal_code && user?.country ? (
            <div className="delivery-address">
              <p className="delivery-name">
                {user.firstname} {user.lastname}
              </p>
              <p>{user.adress}</p>
              <p>
                {user.postal_code} {user.country}
              </p>
              {user.phone && <p>Tél : {user.phone}</p>}
              <p className="delivery-email">{user.mail}</p>

              <button
                type="button"
                className="edit-address-btn"
                onClick={() => navigate("/profile")}
              >
                Modifier l'adresse
              </button>
            </div>
          ) : (
            <div className="delivery-address incomplete">
              <p className="warning-text">⚠️ Adresse de livraison incomplète</p>
              <button
                type="button"
                className="add-address-btn"
                onClick={() => navigate("/profile")}
              >
                Ajouter une adresse
              </button>
            </div>
          )}
        </div>

        {/* Section récapitulatif prix */}
        <div className="order-total-section">
          <h2>Récapitulatif</h2>

          <div className="total-row">
            <span>Sous-total</span>
            <span>{getTotal().toFixed(2)} €</span>
          </div>

          <div className="total-row">
            <span>Livraison</span>
            <span className="free-delivery">Gratuite</span>
          </div>

          <hr />

          <div className="total-row final-total">
            <span>Total</span>
            <span>{getTotal().toFixed(2)} €</span>
          </div>

          <button
            type="button"
            className="proceed-payment-btn"
            onClick={handleProceedToPayment}
            disabled={!user?.adress || !user?.postal_code || !user?.country}
          >
            Procéder au paiement
          </button>

          <button
            type="button"
            className="back-to-cart-btn"
            onClick={handleEditCart}
          >
            Retour au panier
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
