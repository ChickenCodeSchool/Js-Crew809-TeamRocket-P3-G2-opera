import { VscAdd } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import type { OrderData } from "../OrderInProgress/OrderInProgress";
import "./OldOrder.css";

type Props = { order: OrderData };

export default function OldOrder({ order }: Props) {
  const navigate = useNavigate();

  const getDeliveryDate = () => {
    if (order.delivery_date) {
      return new Date(order.delivery_date).toLocaleDateString("fr-FR");
    }

    const fallbackDate = new Date(order.date);
    fallbackDate.setDate(fallbackDate.getDate() + 7);
    return fallbackDate.toLocaleDateString("fr-FR");
  };

  return (
    <div className="old-order-card-order">
      <div className="order-header-order">
        <span className="order-date-label-order">
          Livrée le <strong>{getDeliveryDate()}</strong>
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
    </div>
  );
}
