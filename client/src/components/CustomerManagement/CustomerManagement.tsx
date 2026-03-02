import "./CustomerManagement.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Customer } from "../../types/customer";

export default function CustomerManagement() {
  // --- 1. ÉTATS (Hooks) ---
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();

  // État initial pour le nouveau client avec tous les champs d'adresse
  const [newCustomer, setNewCustomer] = useState<Partial<Customer>>({
    firstname: "",
    lastname: "",
    mail: "",
    phone: "",
    adress: "", // Note: orthographe "adress" pour coller à ta BDD
    postal_code: "",
    country: "",
    role: 0,
    password: "",
  });

  // --- 2. RÉCUPÉRATION DES DONNÉES (Read) ---
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/customers`)
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur récupération API:", err);
        setLoading(false);
      });
  }, []);

  // --- 3. LOGIQUE DE FILTRAGE (Affichage) ---
  const matches = customers.filter((customer) => {
    const s = searchTerm.toLowerCase().trim();
    if (s === "") return true;
    const fullName = `${customer.firstname} ${customer.lastname}`.toLowerCase();
    const customerRef = (1000 + customer.customer_id).toString();
    const fullLocation =
      `${customer.adress} ${customer.postal_code} ${customer.country}`.toLowerCase();

    return (
      fullName.includes(s) ||
      customerRef.includes(s) ||
      fullLocation.includes(s)
    );
  });

  const filteredCustomers =
    searchTerm.length > 0 ? matches.slice(0, 10) : matches;

  // --- 4. ACTIONS MÉTIER (CRUD : C - U - D) ---

  // CREATE : Enregistrement manuel en base de données

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!window.confirm("Confirmer la création en base de données ?")) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/customers`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCustomer), // Envoie tout l'objet, password inclus
        },
      );

      if (response.ok) {
        const result = await response.json(); // Le backend renvoie l'ID (ex: { insertId: 45 })

        // On prépare l'objet complet pour l'affichage immédiat
        const customerToTable = {
          ...newCustomer,
          customer_id: result.insertId || result.id, // On récupère l'ID auto-incrémenté
        } as Customer;

        // On l'ajoute en haut de la liste pour qu'il soit visible et "recherchable"
        setCustomers((prev) => [customerToTable, ...prev]);

        // On ferme le mode ajout et on vide le formulaire
        setIsAdding(false);
        setNewCustomer({
          firstname: "",
          lastname: "",
          mail: "",
          phone: "",
          adress: "",
          postal_code: "",
          country: "",
          role: 0,
          password: "",
        });

        alert("Client créé et sécurisé avec succès !");
      } else {
        alert("Erreur lors de la création. Vérifiez les champs.");
      }
    } catch (err) {
      console.error("Erreur création:", err);
    }
  };

  // UPDATE : Navigation vers l'édition
  const handleEdit = (customerId: number) => {
    navigate(`/admin/client/${customerId}?edit=true`);
  };

  // DELETE : Suppression définitive
  const handleDelete = async (customerId: number) => {
    if (!window.confirm("Supprimer définitivement ce client ?")) return;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/customers/${customerId}`,
        {
          method: "DELETE",
        },
      );
      if (response.ok) {
        setCustomers((prev) =>
          prev.filter((c) => c.customer_id !== customerId),
        );
      }
    } catch (err) {
      console.error("Erreur suppression:", err);
    }
  };

  // --- 5. RENDU (UI) ---
  if (loading)
    return <div className="admin-customer-container">Chargement...</div>;

  return (
    <div className="admin-customer-container">
      <div className="admin-header-flex">
        <h2>GESTION DES CLIENTS</h2>
        <button
          type="button"
          className="add-btn"
          onClick={() => setIsAdding(!isAdding)}
        >
          {isAdding ? "ANNULER" : "+ NOUVEAU CLIENT"}
        </button>
      </div>

      {isAdding ? (
        /* FORMULAIRE DE CRÉATION COMPLET (Inspiré du design de image_0c8f8d.png) */
        <form className="info-card add-customer-form" onSubmit={handleCreate}>
          <div className="form-group">
            <label htmlFor="role">
              <strong>RÔLE ACTUEL :</strong>
            </label>
            <select
              id="role"
              value={newCustomer.role}
              onChange={(e) =>
                setNewCustomer({
                  ...newCustomer,
                  role: Number(e.target.value) as 0 | 1,
                })
              }
            >
              <option value={0}>Client</option>
              <option value={1}>Admin</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="firstname">
              <strong>PRÉNOM :</strong>
            </label>
            <input
              id="firstname"
              type="text"
              required
              value={newCustomer.firstname || ""}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, firstname: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastname">
              <strong>NOM :</strong>
            </label>
            <input
              id="lastname"
              type="text"
              required
              value={newCustomer.lastname || ""}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, lastname: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="mail">
              <strong>EMAIL :</strong>
            </label>
            <input
              id="mail"
              type="email"
              required
              value={newCustomer.mail || ""}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, mail: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="adress">
              <strong>ADRESSE :</strong>
            </label>
            <input
              id="adress"
              type="text"
              value={newCustomer.adress || ""}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, adress: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="postal_code">
              <strong>CODE POSTAL :</strong>
            </label>
            <input
              id="postal_code"
              type="text"
              value={newCustomer.postal_code || ""}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, postal_code: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="country">
              <strong>PAYS :</strong>
            </label>
            <input
              id="country"
              type="text"
              value={newCustomer.country || ""}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, country: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">
              <strong>NUMÉRO TÉLÉPHONE :</strong>
            </label>
            <input
              id="phone"
              type="text"
              value={newCustomer.phone || ""}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, phone: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <strong>MOT DE PASSE :</strong>
            </label>
            <input
              id="password"
              type="password"
              required // Obligatoire pour le hachage backend
              placeholder="Mot de passe provisoire"
              value={newCustomer.password || ""}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, password: e.target.value })
              }
            />
          </div>

          <div className="form-actions-centered">
            <button type="submit" className="save-btn">
              ENREGISTRER EN BDD
            </button>
          </div>
        </form>
      ) : (
        /* LISTE DES CLIENTS (Tableau) */
        <>
          <div className="admin-search-container-centered">
            <input
              type="text"
              placeholder="Rechercher par nom, réf ou adresse..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search-input"
            />
          </div>

          <div className="admin-count-label">
            {filteredCustomers.length} client(s) trouvé(s)
          </div>

          <div className="table-responsive-container">
            <table className="admin-table-customers">
              <thead>
                <tr className="admin-tr-table">
                  <th>Réf.</th>
                  <th>Nom </th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
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
                        <div className="client-primary-info">
                          {customer.firstname} {customer.lastname}
                        </div>
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
                          MODIFIER
                        </button>
                        <button
                          type="button"
                          className="action-btn delete-btn"
                          onClick={() => handleDelete(customer.customer_id)}
                        >
                          SUPPRIMER
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
