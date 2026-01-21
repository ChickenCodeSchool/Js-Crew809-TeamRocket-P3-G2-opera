import { useCallback, useEffect, useState } from "react";
import "./AdminOrderEdit.css";

interface Order {
  order_id: number;
  created_at: string;
  delivery_date: string | null;
  price_total: number;
  status: string;
  customer_id: number;
  firstname: string;
  lastname: string;
}

function AdminOrderEdit() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [deleteInput, setDeleteInput] = useState("");

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/orders`,
      );
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleDelete = async () => {
    const idToDelete = Number(deleteInput);

    if (!deleteInput || Number.isNaN(idToDelete)) {
      window.alert("Veuillez entrer un numéro de commande valide.");
      return;
    }

    if (
      !window.confirm(
        `Êtes-vous sûr de vouloir supprimer la commande #${idToDelete} ?`,
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/orders/${idToDelete}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        window.alert("Commande supprimée avec succès.");
        setDeleteInput("");
        fetchOrders();
      } else {
        window.alert("Erreur : Impossible de supprimer cette commande.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="admin-order-edit-container-orderAdmin">
      <h2>Commandes</h2>

      <div className="delete-section-orderAdmin">
        <label htmlFor="delete-input">Supprimer une commande : </label>
        <div className="delete-wrapper-orderAdmin">
          <input
            id="delete-input"
            type="number"
            placeholder="N° Commande"
            value={deleteInput}
            onChange={(e) => setDeleteInput(e.target.value)}
            className="delete-input-orderAdmin"
          />
          <button
            type="button"
            onClick={handleDelete}
            className="delete-btn-orderAdmin"
          >
            Supprimer
          </button>
        </div>
      </div>

      <div className="list-header-orderAdmin">
        <div className="header-cell-orderAdmin">N°</div>
        <div className="header-cell-orderAdmin">Client</div>
        <div className="header-cell-orderAdmin">Date de création</div>
        <div className="header-cell-orderAdmin">Date de livraison</div>
        <div className="header-cell-orderAdmin">Prix total</div>
        <div className="header-cell-orderAdmin">Statut</div>
      </div>

      <div className="list-body-orderAdmin">
        {orders.map((order) => (
          <div key={order.order_id} className="list-row-orderAdmin">
            <div className="list-cell-orderAdmin cell-id-orderAdmin">
              #{order.order_id}
            </div>
            <div className="list-cell-orderAdmin">
              <span className="client-id-orderAdmin">#{order.customer_id}</span>{" "}
              {order.firstname} {order.lastname}
            </div>
            <div className="list-cell-orderAdmin">
              {new Date(order.created_at).toLocaleDateString("fr-FR")}
            </div>
            <div className="list-cell-orderAdmin">
              {order.delivery_date
                ? new Date(order.delivery_date).toLocaleDateString("fr-FR")
                : "-"}
            </div>
            <div className="list-cell-orderAdmin cell-price-orderAdmin">
              {new Intl.NumberFormat("fr-FR").format(order.price_total)} €
            </div>
            <div className="list-cell-orderAdmin cell-status-orderAdmin">
              {order.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminOrderEdit;
