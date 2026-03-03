import "./CustomerManagement.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Customer } from "../../types/customer";

export default function CustomerManagement() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();

  const [newCustomer, setNewCustomer] = useState<Partial<Customer>>({
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

  const matches = customers.filter((customer) => {
    const s = searchTerm.toLowerCase().trim();
    if (s === "") return true;

    const idValue = customer.customer_id || 0;
    const customerRef = (1000 + idValue).toString();
    const fullName =
      `${customer.firstname || ""} ${customer.lastname || ""}`.toLowerCase();
    const fullLocation =
      `${customer.adress || ""} ${customer.postal_code || ""} ${customer.country || ""}`.toLowerCase();

    return (
      fullName.includes(s) ||
      customerRef.includes(s) ||
      fullLocation.includes(s)
    );
  });

  const filteredCustomers =
    searchTerm.length > 0 ? matches.slice(0, 10) : matches;

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!window.confirm("Confirmer la création en base de données ?")) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/customers`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCustomer),
        },
      );

      if (response.ok) {
        const result = await response.json();
        const finalId =
          result.user?.customer_id || result.insertId || result.id;

        if (!finalId) {
          alert("Client créé mais ID non récupéré. Rafraîchissez la page.");
          return;
        }

        const customerToTable = {
          ...newCustomer,
          customer_id: finalId,
        } as Customer;
        setCustomers((prev) => [customerToTable, ...prev]);
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
        alert("Client créé avec succès !");
      }
    } catch (err) {
      console.error("Erreur création:", err);
    }
  };

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
        <form className="info-card add-customer-form" onSubmit={handleCreate}>
          <div className="form-group">
            <label htmlFor="role">
              <strong>RÔLE :</strong>
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
            <label htmlFor="phone">
              <strong>TÉLÉPHONE :</strong>
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

          {/* --- LES CHAMPS RÉTABLIS ICI --- */}
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
            <label htmlFor="birthday">
              <strong>date de naissance :</strong>
            </label>
            <input
              id="birthday"
              type="text"
              value={newCustomer.birthday || ""}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, birthday: e.target.value })
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
              required
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
                  <th>Nom / Prénom</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.customer_id}>
                    <td>
                      <Link
                        to={`/admin/client/${customer.customer_id}`}
                        className="client-data-link"
                      >
                        <strong>#{1000 + (customer.customer_id || 0)}</strong>
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/admin/client/${customer.customer_id}`}
                        className="client-data-link"
                      >
                        {customer.firstname} {customer.lastname}
                      </Link>
                    </td>
                    <td>{customer.mail}</td>
                    <td className="actions-cell">
                      <div className="actions-wrapper">
                        <button
                          type="button"
                          className="action-btn"
                          onClick={() =>
                            navigate(
                              `/admin/client/${customer.customer_id}?edit=true`,
                            )
                          }
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
