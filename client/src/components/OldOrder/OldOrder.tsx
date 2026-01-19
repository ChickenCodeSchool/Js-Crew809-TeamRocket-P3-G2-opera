import { VscAdd } from "react-icons/vsc";
import type { OrderData } from "../OrderInProgress/OrderInProgress";
import "./OldOrder.css";

type Props = {
  order: OrderData;
};

export default function OldOrder({ order }: Props) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR");
  };

  return (
    <div className="old-order-card-order">
      <div className="order-header-order">
        <span className="order-date-label-order">
          Livrée le <strong>{formatDate(order.delivery_date)}</strong>
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

        <button className="order-action-btn-order" type="button">
          <VscAdd size={24} />
        </button>
      </div>
    </div>
  );
}
