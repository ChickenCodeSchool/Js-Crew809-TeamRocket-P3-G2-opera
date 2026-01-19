import { useEffect, useState } from "react";
import OrderInProgress, {
  type OrderData,
} from "../../components/OrderInProgress/OrderInProgress";
import OldOrder from "../../components/OldOrder/OldOrder";
import "./MyOrderPage.css";

function MyOrderPage() {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulation du Customer ID (à remplacer par le vrai ID plus tard)
  const CUSTOMER_ID = 1;

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/api/orders?customerId=${CUSTOMER_ID}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur chargement commandes", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="orders-loading-order">Chargement...</div>;

  const activeOrders = orders.filter((o) => o.status !== "delivered");
  const pastOrders = orders.filter((o) => o.status === "delivered");

  return (
    <div className="my-orders-page-order">
      <h1 className="page-title-hidden-order">Mes Commandes</h1>

      {/* SECTION 1 : EN COURS */}
      <section className="orders-section-order">
        <h2 className="section-title-order">Commandes en cours</h2>

        {activeOrders.length === 0 ? (
          <p className="no-orders-text-order">Aucune commande en cours.</p>
        ) : (
          activeOrders.map((order) => (
            <OrderInProgress key={order.order_id} order={order} />
          ))
        )}
      </section>

      {/* SECTION 2 : PASSÉES */}
      <section className="orders-section-order">
        <h2 className="section-title-order">Commandes passées</h2>

        {pastOrders.length === 0 ? (
          <p className="no-orders-text-order">Aucun historique de commande.</p>
        ) : (
          pastOrders.map((order) => (
            <OldOrder key={order.order_id} order={order} />
          ))
        )}
      </section>
    </div>
  );
}

export default MyOrderPage;
