import "./CustomerManagement.css";
import { useEffect, useState } from "react"; // Ajout des hooks
import { Link } from "react-router-dom";
import type { Customer } from "../../types/customer";

export default function CustomerManagement() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // État pour la recherche

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

  // Logique de filtrage identique à "Gestion des Produits"
  // 1. D'abord on filtre
  const matches = customers.filter((customer) => {
    const s = searchTerm.toLowerCase().trim();
    if (s === "") return true;

    const firstNameFirst =
      `${customer.firstname} ${customer.lastname}`.toLowerCase();
    const lastNameFirst =
      `${customer.lastname} ${customer.firstname}`.toLowerCase();
    const customerRef = (1000 + customer.customer_id).toString();

    return (
      firstNameFirst.includes(s) ||
      lastNameFirst.includes(s) ||
      customerRef.includes(s)
    );
  });

  // 2. Ensuite on décide si on limite ou pas
  const filteredCustomers =
    searchTerm.length > 0 ? matches.slice(0, 10) : matches;

  const handleEdit = (customerId: number) => {
    alert(`Modifier le client ${customerId}`);
  };

  const handleDelete = (customerId: number) => {
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

      {/* Barre de recherche centrée */}
      <div className="admin-search-container-centered">
        <input
          type="text"
          placeholder="Rechercher un client..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="admin-search-input"
        />
      </div>

      {/* Compteur de résultats aligné à gauche */}
      <div className="admin-count-label">
        {filteredCustomers.length} client(s) trouvé(s)
      </div>

      <div className="table-responsive-container">
        <table className="admin-table-customers">
          <thead>
            <tr className="admin-tr-table">
              <th>Réf.</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
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
                  <td data-label="Actions" className="actions-cell">
                    <div className="actions-wrapper">
                      <button
                        type="button"
                        className="action-btn"
                        onClick={() => handleEdit(customer.customer_id)}
                      >
                        Modifier
                      </button>
                      <button
                        type="button"
                        className="action-btn delete-btn"
                        onClick={() => handleDelete(customer.customer_id)}
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="no-result-row">
                  Aucun client trouvé pour "{searchTerm}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
