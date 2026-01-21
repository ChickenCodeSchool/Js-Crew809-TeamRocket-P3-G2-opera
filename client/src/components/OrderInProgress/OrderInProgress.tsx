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
  const progressWidth = isShipped ? "50%" : "15%";

  return (
    <div className="order-progress-card-order">
      <div className="order-header-order">
        <span className="order-date-label-order">
          Commandée le <strong>{formatDate(order.date)}</strong>
        </span>
        <span className="order-amount-order">
          <span>Montant :</span>
          <span>{new Intl.NumberFormat("fr-FR").format(order.total)} €</span>
        </span>
      </div>

      <div className="order-content-row-order">
        <div className="order-images-grid-order">
          {order.items.slice(0, 3).map((item) => (
            <div key={item.product_id} className="order-item-thumb-order">
              <img
                src={`${import.meta.env.VITE_API_URL}${item.image_url}`}
                alt={item.name}
              />
            </div>
          ))}

          <button
            className="order-action-btn-order"
            type="button"
            onClick={() => navigate(`/orders/${order.order_id}`)}
          >
            <VscAdd size={40} />
          </button>
        </div>
      </div>

      <div className="timeline-container-order">
        <div className="timeline-line-background" />
        <div
          className="timeline-line-progress"
          style={{ width: progressWidth }}
        />
        <div className="timeline-step-order step-start">
          <div className="step-dot-order" />
          <span className="step-label-order">En Préparation</span>
        </div>
        <div className="timeline-step-order step-center">
          <div className="step-dot-order" />
          <div className="step-icon-wrapper-order">
            <LuTruck className="step-icon-order" />
          </div>
        </div>
        <div className="timeline-step-order step-end">
          <div className="step-dot-order" />
          <span className="step-label-order">
            Prévu pour le {formatDate(order.delivery_date)}
          </span>
        </div>
      </div>
    </div>
  );
}
