import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./DetailAdminClient.css";
import type { Customer } from "../../../types/customer";
import type { Order } from "../../../types/order"; // Ajout de l'import

export default function DetailAdminClient() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]); // Nouvel état pour les commandes

  useEffect(() => {
    setLoading(true);

    // 1. Récupération du client
    fetch(`${import.meta.env.VITE_API_URL}/api/customers/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Client introuvable");
        return res.json();
      })
      .then((data) => setCustomer(data))
      .catch((err) => console.error("Erreur client:", err));

    // 2. Récupération des commandes (Assure-toi que cette route existe sur ton API)
    fetch(`${import.meta.env.VITE_API_URL}/api/orders/customer/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur commandes:", err);
        setLoading(false);
      });
  }, [id]);

  // 1. État de chargement pur
  if (loading) {
    return (
      <div className="admin-customer-container loader-container">
        Chargement des données du client...
      </div>
    );
  }

  // 2. État d'erreur si aucun client n'est trouvé après le chargement
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

  // 3. Affichage de la fiche (Succès)
  return (
    <div className="admin-customer-container">
      <h2>Fiche Client {/*{customer.firstname} {customer.lastname}*/}</h2>

      <div className="info-card">
        <p>
          <strong>Rôle actuel :</strong>{" "}
          {customer.role === 1 ? "Admin" : "Client"}
        </p>
        <p>
          <strong>Référence :</strong> #{1000 + customer.customer_id}
        </p>
        <p>
          <strong>Nom Prénom:</strong> {customer.firstname} {customer.lastname}
        </p>
        <p>
          <strong>Email :</strong> {customer.mail}
        </p>
        <p>
          <strong>Date anniverssaire :</strong>
          {customer.birthday
            ? new Date(customer.birthday).toLocaleDateString()
            : "Non renseignée"}
        </p>
        <p>
          <strong>Adresse:</strong>
          {customer.adress || "Non renseignée"}
        </p>
        <p>
          <strong>Code Postal :</strong> {customer.postal_code || "N/A"}
        </p>
        <p>
          <strong>Pays :</strong> {customer.country || "N/A"}
        </p>
        <p>
          <em>
            Compte créé le :{" "}
            {customer.created_at
              ? new Date(customer.created_at).toLocaleDateString()
              : "Inconnue"}
          </em>
        </p>
        <p>
          <strong>Numero Telephone :</strong>
          {customer.phone || "Non renseigné"}
        </p>
        <div>
          <strong>Histotique des commandes :</strong>
          <div className="order-history-section">
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
        </div>
      </div>
      <button
        type="button"
        onClick={() => navigate("/admin/clients")}
        className="add-btn "
      >
        Retour à la liste
      </button>
    </div>
  );
}
