import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import OldOrder from "../../components/OldOrder/OldOrder";
import OrderInProgress, {
  type OrderData,
} from "../../components/OrderInProgress/OrderInProgress";
import "./MyOrderPage.css";
import imageopera from "../../assets/images/imageopera.jpg";

interface User {
  id?: number;
  customer_id?: number;
  firstname: string;
  email: string;
}

interface AuthState {
  user: User | null;
}

interface AuthContextType {
  auth: AuthState | null;
  setAuth: (auth: AuthState | null) => void;
}

function MyOrderPage() {
  const { auth } = useOutletContext<AuthContextType>();
  const user = auth?.user;
  const userId = user?.id || user?.customer_id;

  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/orders?customerId=${userId}`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        setOrders(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(">>> [MyOrderPage] Erreur fetch :", err);
        setOrders([]);
        setLoading(false);
      });
  }, [userId]);

  const activeOrders = orders.filter((o) => o.status !== "delivered");
  const pastOrders = orders.filter((o) => o.status === "delivered");

  return (
    <div className="my-orders-page-order">
      <div className="hero-container-order">
        <img src={imageopera} alt="Hero" className="mini-hero-order" />
      </div>

      <div className="orders-content-centered">
        {loading ? (
          <div className="orders-loading-order">Chargement...</div>
        ) : !userId ? (
          <div className="orders-loading-order">
            Veuillez vous connecter pour voir vos commandes.
          </div>
        ) : (
          <>
            <section className="orders-section-order">
              <h2 className="section-title-order">Commandes en cours</h2>
              {activeOrders.length === 0 ? (
                <p className="no-orders-text-order">
                  Aucune commande en cours.
                </p>
              ) : (
                activeOrders.map((o) => (
                  <OrderInProgress key={o.order_id} order={o} />
                ))
              )}
            </section>

            <section className="orders-section-order">
              <h2 className="section-title-order">Commandes passées</h2>
              {pastOrders.length === 0 ? (
                <p className="no-orders-text-order">Aucun historique.</p>
              ) : (
                pastOrders.map((o) => <OldOrder key={o.order_id} order={o} />)
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default MyOrderPage;
