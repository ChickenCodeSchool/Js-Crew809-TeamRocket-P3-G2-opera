import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderDetailProduct, {
  type OrderDetailItem,
} from "../../components/OrderDetailProduct/OrderDetailProduct";
import "./MyOrderDetailPage.css";

// Interface complète de la commande détaillée
interface OrderDetailData {
  order_id: number;
  date: string;
  total: number;
  status: string;
  items: OrderDetailItem[];
}

function MyOrderDetailPage() {
  const { id } = useParams(); // On récupère l'ID depuis l'URL
  const [order, setOrder] = useState<OrderDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/orders/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Commande introuvable");
        return res.json();
      })
      .then((data) => {
        setOrder(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading-orderDetail">Chargement...</div>;
  if (!order)
    return <div className="error-orderDetail">Commande introuvable.</div>;

  // Formatage de la date
  const formattedDate = new Date(order.date).toLocaleDateString("fr-FR");

  return (
    <div className="page-container-orderDetail">
      {/* Section En-tête (Textes) */}
      <div className="header-section-orderDetail">
        <h1 className="main-title-orderDetail">Détails de la commande :</h1>

        <div className="meta-info-orderDetail">
          <p>N° de commande : {order.order_id}</p>
          <p>Date de commande : {formattedDate}</p>
        </div>
      </div>

      {/* Liste des produits */}
      <div className="products-list-orderDetail">
        {order.items.map((item) => (
          <OrderDetailProduct key={item.product_id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default MyOrderDetailPage;
