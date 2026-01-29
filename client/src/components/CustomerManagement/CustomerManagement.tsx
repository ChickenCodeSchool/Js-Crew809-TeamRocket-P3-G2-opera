// client/src/components/CustomerManagement/CustomerManagement.tsx
import "./CustomerManagement.css";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import { mockCustomers } from "../../data/mockCustomers";

export default function CustomerManagement() {
  const handleEdit = (customerId: number) => {
    console.log("Modifier le client :", customerId);
    alert(`Édition du client ${customerId}`);
  };

  const handleDelete = (customerId: number) => {
    console.log("Supprimer le client :", customerId);
    alert(`Voulez-vous vraiment supprimer le client ${customerId} ?`);
    // Plus tard, on ajoutera ici la logique de suppression
  };

  return (
    <div className="admin-customer-container">
      <h2>Gestion des clients</h2>
      <div className="admin-headeradmin">
        {/* BOUTON AJOUTER : Action n°1 */}
        <button type="button" className="add-btn">
          Ajouter un client
        </button>
      </div>
      <div className="table-responsive-container">
        <table className="admin-table-customers">
          <thead>
            <tr className="admin-tr-table">
              <th>Réf.</th> {/* Nouvelle colonne */}
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockCustomers.map((customer) => (
              <tr key={customer.customer_id}>
                <td data-label="Réf.">
                  <strong>#{1000 + customer.customer_id}</strong>
                </td>
                <td data-label="Nom">{`${customer.firstname} ${customer.lastname}`}</td>
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
                {/* On regroupe les boutons dans UNE SEULE cellule sans balise vide avant */}
                <td data-label="Actions" className="actions-cell">
                  <button type="button" className="action-btn" title="Détails">
                    <FiPlus size={17} />
                  </button>
                  <button
                    type="button"
                    className="action-btn"
                    title="Modifier"
                    onClick={() => handleEdit(customer.customer_id)}
                  >
                    <FiEdit2 size={17} />
                  </button>
                  <button
                    type="button"
                    className="action-btn delete-btn"
                    title="Supprimer"
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
