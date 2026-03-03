import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./DetailAdminClient.css";
import type { Customer } from "../../../types/customer";
import type { Order } from "../../../types/order";

export default function DetailAdminClient() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isEditing, setIsEditing] = useState(
    queryParams.get("edit") === "true",
  );

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`${import.meta.env.VITE_API_URL}/api/customers/${id}`).then((res) =>
        res.json(),
      ),
      fetch(`${import.meta.env.VITE_API_URL}/api/orders/customer/${id}`).then(
        (res) => res.json(),
      ),
    ])
      .then(([customerData, ordersData]) => {
        setCustomer(customerData);
        setOrders(ordersData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    if (customer) {
      setCustomer({ ...customer, [name]: value });
    }
  };

  const handleSave = async () => {
    if (!window.confirm("Confirmer les modifications ?")) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/customers/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(customer),
        },
      );

      if (response.ok) {
        setIsEditing(false);
        navigate(`/admin/client/${id}`, { replace: true });
        alert("Client mis à jour !");
      }
    } catch (err) {
      console.error("Erreur PUT:", err);
    }
  };

  if (loading)
    return <div className="admin-customer-container">Chargement...</div>;

  if (!customer) {
    return (
      <div className="admin-customer-container error-container">
        <p>Erreur : Le client n'existe pas en base de données.</p>
        <button
          type="button"
          onClick={() => navigate("/admin/clients")}
          className="add-btn"
        >
          Retour à la liste
        </button>
      </div>
    );
  }

  return (
    <div className="admin-customer-container">
      <div className="header-fiche-admin">
        <h2>{isEditing ? "Modifier la Fiche" : "Fiche Client"}</h2>
        <div className="header-actions">
          {!isEditing ? (
            <button
              type="button"
              className="action-btn"
              onClick={() => setIsEditing(true)}
            >
              Modifier
            </button>
          ) : (
            <>
              <button type="button" className="save-btn" onClick={handleSave}>
                Enregistrer
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setIsEditing(false)}
              >
                Annuler
              </button>
            </>
          )}
        </div>
      </div>

      <div className="info-card">
        {/* Rôle */}
        <div className="form-group">
          <label htmlFor="role">
            <strong>Rôle actuel :</strong>
          </label>
          {isEditing ? (
            <select
              id="role"
              name="role"
              value={customer.role}
              onChange={handleChange}
            >
              <option value={0}>Client</option>
              <option value={1}>Admin</option>
            </select>
          ) : (
            <span> {customer.role === 1 ? "Admin" : "Client"}</span>
          )}
        </div>

        <div className="form-group">
          <strong>Référence :</strong>
          <span>#{1000 + customer.customer_id}</span>
        </div>

        {/* Prénom */}
        <div className="form-group">
          <label htmlFor="firstname">
            <strong>Prénom :</strong>
          </label>
          {isEditing ? (
            <input
              id="firstname"
              name="firstname"
              value={customer.firstname || ""}
              onChange={handleChange}
            />
          ) : (
            <span> {customer.firstname}</span>
          )}
        </div>

        {/* Nom */}
        <div className="form-group">
          <label htmlFor="lastname">
            <strong>Nom :</strong>
          </label>
          {isEditing ? (
            <input
              id="lastname"
              name="lastname"
              value={customer.lastname || ""}
              onChange={handleChange}
            />
          ) : (
            <span> {customer.lastname}</span>
          )}
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="mail">
            <strong>Email :</strong>
          </label>
          {isEditing ? (
            <input
              id="mail"
              name="mail"
              type="email"
              value={customer.mail || ""}
              onChange={handleChange}
            />
          ) : (
            <span> {customer.mail}</span>
          )}
        </div>

        {/* Téléphone */}
        <div className="form-group">
          <label htmlFor="phone">
            <strong>Téléphone :</strong>
          </label>
          {isEditing ? (
            <input
              id="phone"
              name="phone"
              value={customer.phone || ""}
              onChange={handleChange}
            />
          ) : (
            <span> {customer.phone || "Non renseigné"}</span>
          )}
        </div>
        {/* Addresse */}
        <div className="form-group">
          <label htmlFor="adress">
            <strong>Adresse :</strong>
          </label>
          {isEditing ? (
            <input
              id="adress"
              name="adress"
              value={customer.adress || ""}
              onChange={handleChange}
            />
          ) : (
            <span> {customer.adress || "Non renseigné"}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="postal_code">
            <strong> Code Postale :</strong>
          </label>
          {isEditing ? (
            <input
              id="postal_code"
              name="postal_code"
              value={customer.postal_code || ""}
              onChange={handleChange}
            />
          ) : (
            <span> {customer.postal_code || "Non renseigné"}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="country">
            <strong>Pays :</strong>
          </label>
          {isEditing ? (
            <input
              id="country"
              name="country"
              value={customer.country || ""}
              onChange={handleChange}
            />
          ) : (
            <span> {customer.country || "Non renseigné"}</span>
          )}
        </div>

        {/* Date Anniversaire */}
        <div className="form-group">
          <label htmlFor="birthday">
            <strong>Date de naissance :</strong>
          </label>
          {isEditing ? (
            <input
              id="birthday"
              name="birthday"
              type="date"
              value={
                customer.birthday
                  ? new Date(customer.birthday).toISOString().split("T")[0]
                  : ""
              }
              onChange={handleChange}
            />
          ) : (
            <span>
              {customer.birthday
                ? new Date(customer.birthday).toLocaleDateString()
                : "Non renseignée"}
            </span>
          )}
        </div>

        {/* Date de création (Non modifiable) */}
        <div className="form-group">
          <p style={{ border: "none", margin: 0, width: "100%" }}>
            <em>
              Compte créé le :{" "}
              {customer.created_at
                ? new Date(customer.created_at).toLocaleDateString()
                : "Inconnue"}
            </em>
          </p>
        </div>
      </div>

      <div className="order-history-section">
        <h3>Historique des commandes</h3>
        {orders.length === 0 ? (
          <p>Aucune commande passée pour ce client.</p>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.order_id}>
                  <td>#{order.order_id}</td>
                  <td>{new Date(order.date).toLocaleDateString()}</td>
                  <td>
                    {new Intl.NumberFormat("fr-FR").format(order.total)} €
                  </td>
                  <td>
                    <span className={`status-badge ${order.status}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <button
        type="button"
        onClick={() => navigate("/admin/clients")}
        className="add-btn"
      >
        Retour à la liste
      </button>
    </div>
  );
}
