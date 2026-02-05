import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import type { Auth, User } from "../../App";
import { useCartContext } from "../../contexts/CartContext";
import "react-toastify/dist/ReactToastify.css";
import "./OrderSummary.css";

function OrderSummary() {
  const { items, getTotal, isLoaded } = useCartContext();
  const navigate = useNavigate();
  const { auth, setAuth } = useOutletContext<{
    auth: Auth | null;
    setAuth: (auth: Auth | null) => void;
  }>();
  const [user, setUser] = useState<User | null>(null);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState({
    adress: "",
    postal_code: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    if (!auth || !auth.user) {
      navigate("/auth");
    } else {
      setUser(auth.user);
      setAddressForm({
        adress: auth.user.adress || "",
        postal_code: auth.user.postal_code || "",
        country: auth.user.country || "",
        phone: auth.user.phone || "",
      });
    }
  }, [auth, navigate]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressForm({
      ...addressForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveAddress = async () => {
    if (!user) return;

    if (
      !addressForm.adress ||
      !addressForm.postal_code ||
      !addressForm.country
    ) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/customers/${user.customer_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(addressForm),
        },
      );

      if (response.ok) {
        // Mettre à jour l'utilisateur local en conservant toutes les propriétés existantes
        const updatedUser: User = {
          ...user,
          ...addressForm,
        };
        setUser(updatedUser);

        // Mettre à jour le contexte auth
        if (auth) {
          setAuth({
            ...auth,
            user: updatedUser,
          });
        }

        setIsEditingAddress(false);
        toast.success("Adresse mise à jour avec succès !");
      } else {
        toast.error("Erreur lors de la mise à jour de l'adresse");
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Erreur serveur");
    }
  };

  const handleCancelEdit = () => {
    if (user) {
      setAddressForm({
        adress: user.adress || "",
        postal_code: user.postal_code || "",
        country: user.country || "",
        phone: user.phone || "",
      });
    }
    setIsEditingAddress(false);
  };

  const handleProceedToPayment = async () => {
    if (items.length === 0) {
      alert("Votre panier est vide");
      return;
    }

    if (!user?.adress || !user?.postal_code || !user?.country) {
      toast.error("Veuillez compléter votre adresse de livraison");
      setIsEditingAddress(true);
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
              product_id: item.product_id, // ← Ajouté
              size_id: item.size_id, // ← Ajouté
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              size_label: item.size_label,
            })),
            customer_id: user.customer_id, // ← Ajouté
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

  if (!isLoaded || !user) {
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
    <>
      <div className="order-summary-container">
        <h1>Récapitulatif de commande</h1>

        <div className="order-summary-content">
          <div className="order-summary-items-section">
            <div className="section-header-summary">
              <h2>Vos articles</h2>
              <button
                type="button"
                className="edit-summarycart-btn"
                onClick={handleEditCart}
              >
                Modifier le panier
              </button>
            </div>

            <div className="order-summary-items-list">
              {items.map((item) => (
                <div
                  key={`${item.product_id}-${item.size_id}`}
                  className="order-summary-item"
                >
                  <img
                    src={`${baseUrl}${item.url}`}
                    alt={item.name}
                    className="order-summary-item-image"
                  />
                  <div className="order-summary-item-details">
                    <h3>{item.name}</h3>
                    {item.size_label && (
                      <p className="item-summary-size">
                        Taille : {item.size_label}
                      </p>
                    )}
                    <p className="item-summary-quantity">
                      Quantité : {item.quantity}
                    </p>
                  </div>
                  <div className="order-summary-item-price">
                    € {Number(item.price).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="delivery-summary-section">
            <h2>Adresse de livraison</h2>

            {isEditingAddress ? (
              <div className="address-edit-form">
                <div className="form-group">
                  <label htmlFor="adress">Adresse *</label>
                  <input
                    type="text"
                    id="adress"
                    name="adress"
                    value={addressForm.adress}
                    onChange={handleAddressChange}
                    placeholder="123 rue de la Paix"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="postal_code">Code postal *</label>
                  <input
                    type="text"
                    id="postal_code"
                    name="postal_code"
                    value={addressForm.postal_code}
                    onChange={handleAddressChange}
                    placeholder="75001"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="country">Pays *</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={addressForm.country}
                    onChange={handleAddressChange}
                    placeholder="France"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Téléphone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={addressForm.phone}
                    onChange={handleAddressChange}
                    placeholder="+33 6 12 34 56 78"
                  />
                </div>

                <div className="address-form-actions">
                  <button
                    type="button"
                    className="save-address-btn"
                    onClick={handleSaveAddress}
                  >
                    Enregistrer
                  </button>
                  <button
                    type="button"
                    className="cancel-address-btn"
                    onClick={handleCancelEdit}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            ) : (
              <>
                {user?.adress && user?.postal_code && user?.country ? (
                  <div className="delivery-summary-address">
                    <p className="delivery-summary-name">
                      {user.firstname} {user.lastname}
                    </p>
                    <p>{user.adress}</p>
                    <p>
                      {user.postal_code} {user.country}
                    </p>
                    {user.phone && <p>Tél : {user.phone}</p>}
                    <p className="delivery-summary-email">{user.mail}</p>

                    <button
                      type="button"
                      className="summary-edit-address-btn"
                      onClick={() => setIsEditingAddress(true)}
                    >
                      Modifier l'adresse
                    </button>
                  </div>
                ) : (
                  <div className="delivery-summary-address incomplete">
                    <p className="summary-warning-text">
                      ⚠️ Adresse de livraison incomplète
                    </p>
                    <button
                      type="button"
                      className="summary-add-address-btn"
                      onClick={() => setIsEditingAddress(true)}
                    >
                      Ajouter une adresse
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="order-summary-total-section">
            <h2>Récapitulatif</h2>

            <div className="summary-total-row">
              <span>Sous-total</span>
              <span>{getTotal().toFixed(2)} €</span>
            </div>

            <div className="summary-total-row">
              <span>Livraison</span>
              <span className="summary-free-delivery">Gratuite</span>
            </div>

            <hr />

            <div className="summary-total-row final-total">
              <span>Total</span>
              <span>{getTotal().toFixed(2)} €</span>
            </div>

            <button
              type="button"
              className="proceed-payment-btn"
              onClick={handleProceedToPayment}
              disabled={!user?.adress || !user?.postal_code || !user?.country}
            >
              Procéder au paiement avec Stripe
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

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default OrderSummary;
