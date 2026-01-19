import { useNavigate } from "react-router-dom";
import { LuTruck } from "react-icons/lu";
import { VscAdd } from "react-icons/vsc";
import "./OrderInProgress.css";

export interface OrderItem {
  product_id: number;
  name: string;
  image_url: string;
  quantity: number;
}

export interface OrderData {
  order_id: number;
  date: string;
  total: number;
  status: "pending" | "preparing" | "shipped" | "delivered";
  delivery_date: string;
  items: OrderItem[];
}

type Props = {
  order: OrderData;
};

export default function OrderInProgress({ order }: Props) {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR");
  };

  const isShipped = order.status === "shipped";
  const isPreparing =
    order.status === "preparing" || order.status === "pending";

  return (
    <div className="order-progress-card-order">
      <div className="order-header-order">
        <span className="order-date-label-order">
          Commandée le <strong>{formatDate(order.date)}</strong>
        </span>
        <span className="order-amount-order">
          Montant : € {new Intl.NumberFormat("fr-FR").format(order.total)}
        </span>
      </div>

      <div className="order-content-row-order">
        <div className="order-images-grid-order">
          {order.items.map((item) => (
            <div key={item.product_id} className="order-item-thumb-order">
              <img
                src={`${import.meta.env.VITE_API_URL}${item.image_url}`}
                alt={item.name}
              />
            </div>
          ))}
        </div>
        <button
          className="order-action-btn-order"
          type="button"
          onClick={() => navigate(`/orders/${order.order_id}`)}
        >
          <VscAdd size={24} />
        </button>
      </div>

      <div className="timeline-container-order">
        <div className="timeline-line-order">
          <div
            className="timeline-progress-order"
            style={{ width: isShipped ? "50%" : "0%" }}
          />
        </div>
        <div
          className={`timeline-step-order ${isPreparing || isShipped ? "active-order" : ""}`}
        >
          <div className="step-dot-order" />
          <span className="step-label-order">En Préparation</span>
        </div>
        <div
          className={`timeline-step-order center-step-order ${isShipped ? "active-order" : ""}`}
        >
          <div className="step-icon-wrapper-order">
            <LuTruck className="step-icon-order" />
          </div>
        </div>
        <div className="timeline-step-order end-step-order">
          <div className="step-dot-order" />
          <span className="step-label-order">
            Prévu pour le {formatDate(order.delivery_date)}
          </span>
        </div>
      </div>
    </div>
  );
}
