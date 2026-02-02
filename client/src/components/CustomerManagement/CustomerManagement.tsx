import "./CustomerManagement.css";
import { useEffect, useState } from "react"; // Ajout des hooks
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import type { Customer } from "../../types/customer";

export default function CustomerManagement() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  // Appel à la base de données au montage du composant
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/customers`)
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des clients :", error);
        setLoading(false);
      });
  }, []);

  const handleEdit = (customerId: number) => {
    console.log("Modifier le client :", customerId);
    alert(`Édition du client ${customerId}`);
  };

  const handleDelete = (customerId: number) => {
    console.log("Supprimer le client :", customerId);
    alert(`Voulez-vous vraiment supprimer le client ${customerId} ?`);
    // Plus tard, on ajoutera ici la logique de suppression
  };
  // --- LA LIGNE QUI RÈGLE TON ERREUR ---
  // Ici, on lit la variable loading. TypeScript est maintenant content.
  if (loading) {
    return (
      <div className="admin-customer-container">Chargement des données...</div>
    );
  }

  return (
    <div className="admin-customer-container">
      <h2>Gestion des clients</h2>
      <div className="table-responsive-container">
        <table className="admin-table">
          <thead>
            <tr className="admin-tr-table">
              <th>Réf.</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.customer_id}>
                <td data-label="Réf.">
                  <Link
                    to={`/admin/client/${customer.customer_id}`}
                    className="client-data-link"
                  >
                    <strong>#{1000 + customer.customer_id}</strong>
                  </Link>
                </td>
                <td data-label="Nom">
                  <Link
                    to={`/admin/client/${customer.customer_id}`}
                    className="client-data-link"
                  >
                    {`${customer.firstname} ${customer.lastname}`}
                  </Link>
                </td>
                <td data-label="Email">{customer.mail}</td>
                <td
                  data-label="Rôle"
                  className={
                    customer.role === 1
                      ? "role-badge role-admin"
                      : "role-badge role-client"
                  }
                >
                  {customer.role === 1 ? "Admin" : "Client"}
                </td>
                <td data-label="Actions" className="actions-cell">
                  <button
                    type="button"
                    className="action-btn"
                    onClick={() => handleEdit(customer.customer_id)}
                  >
                    <FiEdit2 size={17} />
                  </button>
                  <button
                    type="button"
                    className="action-btn delete-btn"
                    onClick={() => handleDelete(customer.customer_id)}
                  >
                    <FiTrash2 size={17} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
