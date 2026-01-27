// client/src/components/CustomerManagement/CustomerManagement.tsx
import "./CustomerManagement.css";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import { mockCustomers } from "../../data/mockCustomers";

export default function CustomerManagement() {
  return (
    <div className="admin-customer-container">
      <h2>Gestion des clients</h2>
      <div className="admin-header">
        {/* BOUTON AJOUTER : Action n°1 */}
        <button type="button" className="add-btn">
          Ajouter un client
        </button>
      </div>
      <table className="admin-table">
        <thead>
          <tr className="admin-tr-table">
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mockCustomers.map((customer) => (
            <tr key={customer.customer_id}>
              <td>{`${customer.firstname} ${customer.lastname}`}</td>
              <td>{customer.mail}</td>
              <td
                className={
                  customer.role === 1
                    ? "role-badge role-admin"
                    : "role-badge role-client"
                }
              >
                {customer.role === 1 ? "Admin" : "Client"}
              </td>
              {/* On regroupe les boutons dans UNE SEULE cellule sans balise vide avant */}
              <td className="actions-cell">
                <button type="button" className="action-btn" title="Détails">
                  <FiPlus size={17} />
                </button>
                <button type="button" className="action-btn" title="Modifier">
                  <FiEdit2 size={17} />
                </button>
                <button
                  type="button"
                  className="action-btn delete-btn"
                  title="Supprimer"
                >
                  <FiTrash2 size={17} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
