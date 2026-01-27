import { useCallback, useEffect, useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaSave,
  FaSearch,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AdminOrderEdit.css";

const ConfirmationToast = ({
  message,
  onConfirm,
  closeToast,
}: {
  message: string;
  onConfirm: () => void;
  closeToast?: () => void;
}) => (
  <div className="confirm-toast-content-orderAdmin">
    <p className="confirm-toast-text-orderAdmin">{message}</p>
    <div className="confirm-toast-actions-orderAdmin">
      <button
        type="button"
        className="confirm-btn-yes-orderAdmin"
        onClick={() => {
          onConfirm();
          if (closeToast) closeToast();
        }}
      >
        Confirmer
      </button>
      <button
        type="button"
        className="confirm-btn-no-orderAdmin"
        onClick={closeToast}
      >
        Annuler
      </button>
    </div>
  </div>
);

interface OrderItem {
  product_id: number;
  name: string;
  quantity: number;
}

interface Order {
  order_id: number;
  created_at: string;
  delivery_date: string | null;
  price_total: number;
  status: string;
  customer_id: number;
  firstname: string;
  lastname: string;
  items: OrderItem[];
}

interface EditingState {
  orderId: number;
  field: "created_at" | "delivery_date" | "status";
}

function AdminOrderEdit() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [deleteInput, setDeleteInput] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [editingState, setEditingState] = useState<EditingState | null>(null);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  const [tempDateValue, setTempDateValue] = useState("");
  const [tempStatusValue, setTempStatusValue] = useState("");

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/orders`,
      );
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
      toast.error("Erreur de connexion au serveur");
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleSearch = () => {
    const idToFind = Number(searchInput);
    if (!searchInput || Number.isNaN(idToFind)) {
      toast.warn("Veuillez entrer un numéro valide.");
      return;
    }

    const element = document.getElementById(`order-row-${idToFind}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      element.classList.add("highlight-row-orderAdmin");
      setTimeout(() => {
        element.classList.remove("highlight-row-orderAdmin");
      }, 2000);
      toast.info(`Commande #${idToFind} trouvée`);
    } else {
      toast.error(`Commande #${idToFind} introuvable dans la liste.`);
    }
  };

  const handleDelete = () => {
    const idToDelete = Number(deleteInput);
    if (!deleteInput || Number.isNaN(idToDelete)) {
      toast.warn("Veuillez entrer un numéro de commande valide.");
      return;
    }

    toast(
      <ConfirmationToast
        message={`Supprimer la commande #${idToDelete} ?`}
        onConfirm={async () => {
          try {
            const response = await fetch(
              `${import.meta.env.VITE_API_URL}/api/admin/orders/${idToDelete}`,
              { method: "DELETE" },
            );
            if (response.ok) {
              toast.success("Commande supprimée avec succès.");
              setDeleteInput("");
              fetchOrders();
            } else {
              toast.error("Erreur lors de la suppression.");
            }
          } catch (error) {
            console.error(error);
            toast.error("Erreur serveur lors de la suppression.");
          }
        }}
      />,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      },
    );
  };

  const handleRowDelete = (id: number) => {
    toast(
      <ConfirmationToast
        message={`Voulez-vous vraiment supprimer la commande #${id} ?`}
        onConfirm={async () => {
          try {
            const response = await fetch(
              `${import.meta.env.VITE_API_URL}/api/admin/orders/${id}`,
              { method: "DELETE" },
            );
            if (response.ok) {
              toast.success(`Commande #${id} supprimée.`);
              fetchOrders();
            } else {
              toast.error("Erreur suppression.");
            }
          } catch (error) {
            console.error(error);
            toast.error("Erreur serveur.");
          }
        }}
      />,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      },
    );
  };

  const handleRemoveItem = (orderId: number, productId: number) => {
    toast(
      <ConfirmationToast
        message="Retirer cet article de la commande ?"
        onConfirm={async () => {
          try {
            const res = await fetch(
              `${import.meta.env.VITE_API_URL}/api/admin/orders/${orderId}/items/${productId}`,
              { method: "DELETE" },
            );
            if (res.ok) {
              toast.success("Article retiré du panier.");
              fetchOrders();
            } else {
              console.error("Erreur API");
              toast.error("Impossible de retirer l'article.");
            }
          } catch (err) {
            console.error(err);
            toast.error("Erreur serveur.");
          }
        }}
      />,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      },
    );
  };

  const toggleItems = (orderId: number) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };

  const startEditing = (
    order: Order,
    field: "created_at" | "delivery_date" | "status",
  ) => {
    setEditingState({ orderId: order.order_id, field });

    if (field === "status") {
      setTempStatusValue(order.status);
    } else {
      const rawValue = order[field];
      if (rawValue) {
        setTempDateValue(new Date(rawValue).toISOString().split("T")[0]);
      } else {
        setTempDateValue("");
      }
    }
  };

  const cancelEditing = () => {
    setEditingState(null);
    setTempDateValue("");
    setTempStatusValue("");
  };

  const saveChange = async (order: Order) => {
    if (!editingState) return;

    const cleanDate = (dateStr: string | null) => {
      if (!dateStr) return null;
      return dateStr.includes("T") ? dateStr.split("T")[0] : dateStr;
    };

    const updatedData = {
      created_at: cleanDate(order.created_at) || "",
      delivery_date: cleanDate(order.delivery_date),
      status: order.status,
    };

    if (editingState.field === "created_at") {
      updatedData.created_at = tempDateValue;
    } else if (editingState.field === "delivery_date") {
      updatedData.delivery_date = tempDateValue || null;
    } else if (editingState.field === "status") {
      updatedData.status = tempStatusValue;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/orders/${order.order_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        },
      );

      if (res.ok) {
        toast.success("Modification enregistrée !");
        fetchOrders();
        setEditingState(null);
      } else {
        console.error("Erreur save");
        toast.error("Erreur lors de la sauvegarde.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erreur serveur lors de la sauvegarde.");
    }
  };

  const formatDateDisplay = (dateString: string | null) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("fr-FR");
  };

  return (
    <div className="admin-order-edit-container-orderAdmin">
      <h2>Gestion des commandes</h2>

      <div className="admin-controls-orderAdmin">
        <div className="control-section-orderAdmin search-section-orderAdmin">
          <label htmlFor="search-input">Rechercher : </label>
          <div className="control-wrapper-orderAdmin">
            <input
              id="search-input"
              type="number"
              placeholder="N° Commande"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="control-input-orderAdmin"
            />
            <button
              type="button"
              onClick={handleSearch}
              className="control-btn-orderAdmin search-btn-orderAdmin"
            >
              <FaSearch style={{ marginRight: "5px" }} /> Trouver
            </button>
          </div>
        </div>

        <div className="control-section-orderAdmin delete-section-orderAdmin">
          <label htmlFor="delete-input">Supprimer : </label>
          <div className="control-wrapper-orderAdmin">
            <input
              id="delete-input"
              type="number"
              placeholder="N° Commande"
              value={deleteInput}
              onChange={(e) => setDeleteInput(e.target.value)}
              className="control-input-orderAdmin"
            />
            <button
              type="button"
              onClick={handleDelete}
              className="control-btn-orderAdmin delete-btn-orderAdmin"
            >
              <FaTrash style={{ marginRight: "5px" }} /> Supprimer
            </button>
          </div>
        </div>
      </div>

      <div className="list-header-orderAdmin">
        <div className="header-cell-orderAdmin">N°</div>
        <div className="header-cell-orderAdmin">Client</div>
        <div className="header-cell-orderAdmin">Articles</div>
        <div className="header-cell-orderAdmin">Création</div>
        <div className="header-cell-orderAdmin">Livraison</div>
        <div className="header-cell-orderAdmin">Prix total</div>
        <div className="header-cell-orderAdmin">Statut</div>
        <div className="header-cell-orderAdmin">Suppr.</div>
      </div>

      <div className="list-body-orderAdmin">
        {orders.map((order) => {
          const isEditingCreated =
            editingState?.orderId === order.order_id &&
            editingState?.field === "created_at";
          const isEditingDelivery =
            editingState?.orderId === order.order_id &&
            editingState?.field === "delivery_date";
          const isEditingStatus =
            editingState?.orderId === order.order_id &&
            editingState?.field === "status";
          const isExpanded = expandedOrderId === order.order_id;

          return (
            <div
              key={order.order_id}
              id={`order-row-${order.order_id}`}
              className="list-row-container-orderAdmin"
            >
              <div className="list-row-orderAdmin">
                <div className="list-cell-orderAdmin cell-id-orderAdmin">
                  #{order.order_id}
                </div>
                <div className="list-cell-orderAdmin">
                  <span className="client-id-orderAdmin">
                    #{order.customer_id}
                  </span>{" "}
                  {order.firstname} {order.lastname}
                </div>

                <button
                  type="button"
                  className="list-cell-orderAdmin clickable-cell-orderAdmin items-toggle-orderAdmin"
                  onClick={() => toggleItems(order.order_id)}
                >
                  <span style={{ marginRight: "5px" }}>
                    {order.items.length} article(s)
                  </span>
                  {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                </button>

                <button
                  type="button"
                  className="list-cell-orderAdmin clickable-cell-orderAdmin"
                  onClick={() =>
                    !isEditingCreated && startEditing(order, "created_at")
                  }
                >
                  {isEditingCreated ? (
                    <div className="edit-wrapper-orderAdmin">
                      <input
                        type="date"
                        value={tempDateValue}
                        onChange={(e) => setTempDateValue(e.target.value)}
                        className="edit-input-orderAdmin"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className="edit-actions-orderAdmin">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            saveChange(order);
                          }}
                          className="save-mini-btn-orderAdmin"
                        >
                          <FaSave />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            cancelEditing();
                          }}
                          className="cancel-mini-btn-orderAdmin"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    </div>
                  ) : (
                    formatDateDisplay(order.created_at)
                  )}
                </button>

                <button
                  type="button"
                  className="list-cell-orderAdmin clickable-cell-orderAdmin"
                  onClick={() =>
                    !isEditingDelivery && startEditing(order, "delivery_date")
                  }
                >
                  {isEditingDelivery ? (
                    <div className="edit-wrapper-orderAdmin">
                      <input
                        type="date"
                        value={tempDateValue}
                        onChange={(e) => setTempDateValue(e.target.value)}
                        className="edit-input-orderAdmin"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className="edit-actions-orderAdmin">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            saveChange(order);
                          }}
                          className="save-mini-btn-orderAdmin"
                        >
                          <FaSave />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            cancelEditing();
                          }}
                          className="cancel-mini-btn-orderAdmin"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    </div>
                  ) : (
                    formatDateDisplay(order.delivery_date)
                  )}
                </button>

                <div className="list-cell-orderAdmin cell-price-orderAdmin">
                  {new Intl.NumberFormat("fr-FR").format(order.price_total)} €
                </div>

                <button
                  type="button"
                  className="list-cell-orderAdmin clickable-cell-orderAdmin cell-status-orderAdmin"
                  onClick={() =>
                    !isEditingStatus && startEditing(order, "status")
                  }
                >
                  {isEditingStatus ? (
                    <div className="edit-wrapper-orderAdmin">
                      <select
                        value={tempStatusValue}
                        onChange={(e) => setTempStatusValue(e.target.value)}
                        className="edit-select-orderAdmin"
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                      >
                        <option value="pending">En attente</option>
                        <option value="preparing">En préparation</option>
                        <option value="shipped">Expédiée</option>
                        <option value="delivered">Livrée</option>
                      </select>

                      <div className="edit-actions-orderAdmin">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            saveChange(order);
                          }}
                          className="save-mini-btn-orderAdmin"
                        >
                          <FaSave />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            cancelEditing();
                          }}
                          className="cancel-mini-btn-orderAdmin"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    </div>
                  ) : (
                    order.status
                  )}
                </button>

                <div className="list-cell-orderAdmin cell-delete-orderAdmin">
                  <button
                    type="button"
                    className="delete-cross-btn-orderAdmin"
                    onClick={() => handleRowDelete(order.order_id)}
                    title="Supprimer la commande"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="items-dropdown-orderAdmin">
                  {order.items && order.items.length > 0 ? (
                    <ul className="items-list-orderAdmin">
                      {order.items.map((item, index) => (
                        <li
                          key={`${order.order_id}-${item.product_id}-${index}`}
                          className="item-row-orderAdmin"
                        >
                          <span className="item-name-orderAdmin">
                            {item.name}
                          </span>
                          <span className="item-qty-orderAdmin">
                            x{item.quantity}
                          </span>
                          <button
                            type="button"
                            className="item-delete-btn-orderAdmin"
                            onClick={() =>
                              handleRemoveItem(order.order_id, item.product_id)
                            }
                            title="Supprimer cet article"
                          >
                            <FaTrash />
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="no-items-orderAdmin">Aucun article.</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        toastClassName="order-toast-orderAdmin"
      />
    </div>
  );
}

export default AdminOrderEdit;
