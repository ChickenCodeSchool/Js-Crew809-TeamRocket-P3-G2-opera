import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../contexts/CartContext";
import "./Cart.css";

function Cart() {
  const { items, removeFromCart, updateQuantity, getTotal, isLoaded } =
    useCartContext();
  const navigate = useNavigate();

  if (!isLoaded) {
    return (
      <div className="cart-container">
        <p>Chargement...</p>
      </div>
    );
  }

  const handleCheckout = () => {
    if (items.length === 0) {
      alert("Votre panier est vide");
      return;
    }
    // TODO: Implémenter la logique de paiement
    alert(
      `Paiement de ${getTotal().toFixed(2)}€ - Fonctionnalité à implémenter`,
    );
  };

  const handleContinueShopping = () => {
    navigate("/");
  };

  const baseUrl = import.meta.env.VITE_API_URL;

  if (items.length === 0) {
    return (
      <div className="cart-container">
        <h1>Panier</h1>
        <div className="empty-cart">
          <p>Votre panier est vide</p>
          <button
            type="button"
            className="continue-shopping-btn"
            onClick={handleContinueShopping}
          >
            Continuer vos achats
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Panier</h1>

      <div className="cart-content">
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.product_id} className="cart-item">
              <img
                src={`${baseUrl}${item.image_url}`}
                alt={item.name}
                className="item-image"
              />
              <div className="item-product">
                <div className="item-details">
                  <h3>{item.name}</h3>
                </div>
                <div className="item-price">
                  € {Math.floor(+item.price.toFixed(2))}
                </div>

                <div className="item-action">
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeFromCart(item.product_id)}
                  >
                    Retirer
                  </button>
                </div>
              </div>

              <div className="item-quantity">
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() =>
                    updateQuantity(item.product_id, item.quantity - 1)
                  }
                >
                  −
                </button>
                <span className="qty-value">{item.quantity}</span>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() =>
                    updateQuantity(item.product_id, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-card">
            <h2>Résumé de la commande</h2>

            <div className="summary-row">
              <span>Nombre d'articles : ( {items.length} )</span>
            </div>

            <div className="summary-row">
              <span>Livraison gratuite</span>
            </div>

            <hr />

            <div className="summary-row total">
              <span>Total</span>
              <span>€ {Math.floor(+getTotal().toFixed(2))}</span>
            </div>

            <button
              type="button"
              className="checkout-btn"
              onClick={handleCheckout}
            >
              Procéder au paiement
            </button>

            <button
              type="button"
              className="continue-shopping-btn"
              onClick={handleContinueShopping}
            >
              Continuer vos achats
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
