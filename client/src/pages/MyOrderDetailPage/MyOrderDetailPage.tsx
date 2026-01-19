import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderDetailProduct, {
  type OrderDetailItem,
} from "../../components/OrderDetailProduct/OrderDetailProduct";
import "./MyOrderDetailPage.css";
import imageopera from "../../assets/images/imageopera.jpg";

interface OrderDetailData {
  order_id: number;
  date: string;
  total: number;
  items: OrderDetailItem[];
}

function MyOrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<OrderDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`${import.meta.env.VITE_API_URL}/api/orders/${id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        setOrder(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  return (
    <div className="page-container-orderDetail">
      <div className="hero-container-orderDetail">
        <img src={imageopera} alt="Hero" className="mini-hero-orderDetail" />
      </div>

      <div className="content-centered-orderDetail">
        {loading ? (
          <div className="loading-orderDetail">Chargement...</div>
        ) : !order ? (
          <div className="error-orderDetail">Commande introuvable.</div>
        ) : (
          <>
            <div className="header-section-orderDetail">
              <h1 className="main-title-orderDetail">Détails de la commande</h1>
              <div className="meta-info-orderDetail">
                <p>N° de commande : {order.order_id}</p>
                <p>
                  Date de commande :{" "}
                  {new Date(order.date).toLocaleDateString("fr-FR")}
                </p>
              </div>
            </div>
            <div className="products-list-orderDetail">
              {order.items.map((item) => (
                <OrderDetailProduct key={item.product_id} item={item} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MyOrderDetailPage;
