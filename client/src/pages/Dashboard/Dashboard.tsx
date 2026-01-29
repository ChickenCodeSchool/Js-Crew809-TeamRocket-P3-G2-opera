import { useEffect, useState } from "react";
import "./Dashboard.css";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface RevenueData {
  month: string;
  total: number;
}
interface TopProduct {
  product_id: number;
  name: string;
  totalSold: number;
}
interface ItemsPerDay {
  day: string;
  totalItems: number;
}
interface CustomersPerDay {
  day: string;
  totalCustomers: number;
}

export default function Dashboard() {
  const [revenue, setRevenue] = useState<RevenueData[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [itemsPerDay, setItemsPerDay] = useState<ItemsPerDay[]>([]);
  const [customersPerDay, setCustomersPerDay] = useState<CustomersPerDay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      try {
        const [rev, prod, items, customers] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/api/dashboard/revenue`).then(
            (r) => r.json(),
          ),
          fetch(
            `${import.meta.env.VITE_API_URL}/api/dashboard/top-products?limit=5`,
          ).then((r) => r.json()),
          fetch(
            `${import.meta.env.VITE_API_URL}/api/dashboard/items-per-day`,
          ).then((r) => r.json()),
          fetch(
            `${import.meta.env.VITE_API_URL}/api/dashboard/customers-per-day`,
          ).then((r) => r.json()),
        ]);
        setRevenue(rev);
        setTopProducts(prod);
        setItemsPerDay(items);
        setCustomersPerDay(customers);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  if (loading) return <div className="dashboard-loading">Chargement…</div>;

  const totalRevenue = revenue.reduce((a, r) => a + r.total, 0);
  const totalItems = itemsPerDay.reduce((a, i) => a + i.totalItems, 0);
  const totalCustomers = customersPerDay.reduce(
    (a, c) => a + c.totalCustomers,
    0,
  );
  const GOLD_COLORS = ["#d4af37", "#c9a24d", "#b8944a", "#a8843f"];

  return (
    <div className="dashboard-container">
      <div className="dashboard-top">
        <section className="dashboard-section revenue dashboard-left">
          <ResponsiveContainer width={400} height={400}>
            <PieChart>
              <Pie
                data={revenue}
                dataKey="total"
                nameKey="month"
                cx="50%"
                cy="50%"
                outerRadius={200}
                stroke="none"
                paddingAngle={4}
              >
                {revenue.map((entry, index) => (
                  <Cell
                    key={entry.month}
                    fill={GOLD_COLORS[index % GOLD_COLORS.length]}
                    stroke="#555"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(v) =>
                  v == null ? "0" : `€ ${Number(v).toLocaleString()}`
                }
                labelFormatter={(l) => `Mois : ${l}`}
                contentStyle={{
                  backgroundColor: "#8b8787",
                  border: "1px solid #d4af37",
                  color: "#d4af37",
                  fontWeight: "600",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="section-footer">
            <div className="section-title">Chiffre d'affaires</div>
            <div className="section-kpi">€ {totalRevenue.toLocaleString()}</div>
          </div>
        </section>

        <section className="dashboard-section large-card dashboard-right">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={topProducts}
              margin={{ top: 30, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid stroke="#333" />
              <XAxis dataKey="name" tick={false} />
              <YAxis tick={{ fill: "#d4af37", fontSize: 12 }} />
              <Tooltip
                labelFormatter={(l) => `Produit : ${l}`}
                formatter={(v) => v?.toLocaleString()}
                contentStyle={{
                  backgroundColor: "#0b0b0b",
                  border: "1px solid #d4af37",
                  color: "#d4af37",
                  fontWeight: "600",
                }}
              />
              <Bar
                dataKey="totalSold"
                fill="#d4af37"
                barSize={36}
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
          <div className="section-footer">
            <div className="section-title">Produits les plus vendus</div>
          </div>
        </section>
      </div>

      <div className="dashboard-bottom">
        <section className="dashboard-section large-card">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart
              data={customersPerDay}
              margin={{ top: 30, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid stroke="#333" strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={false} />
              <YAxis tick={{ fill: "#d4af37", fontSize: 12 }} />
              <Tooltip
                labelFormatter={(l) =>
                  `Date : ${new Date(l as string).toLocaleDateString()}`
                }
                formatter={(v) => v?.toLocaleString()}
              />
              <Line
                type="monotone"
                dataKey="totalCustomers"
                stroke="#d4af37"
                strokeWidth={3}
                dot={{ r: 4, stroke: "#d4af37", strokeWidth: 2, fill: "#fff" }}
                activeDot={{
                  r: 6,
                  fill: "#d4af37",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="section-footer">
            <div className="section-title">Clients</div>
            <div className="section-kpi">{totalCustomers} clients</div>
          </div>
        </section>

        <section className="dashboard-section large-card">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart
              data={itemsPerDay}
              margin={{ top: 30, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid stroke="#333" strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={false} />
              <YAxis tick={{ fill: "#d4af37", fontSize: 12 }} />
              <Tooltip
                labelFormatter={(l) =>
                  `Date : ${new Date(l as string).toLocaleDateString()}`
                }
                formatter={(v) => v?.toLocaleString()}
              />
              <Line
                type="monotone"
                dataKey="totalItems"
                stroke="#d4af37"
                strokeWidth={3}
                dot={{ r: 4, stroke: "#d4af37", strokeWidth: 2, fill: "#fff" }}
                activeDot={{
                  r: 6,
                  fill: "#d4af37",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="section-footer">
            <div className="section-title">Articles vendus</div>
            <div className="section-kpi">{totalItems} articles</div>
          </div>
        </section>
      </div>
    </div>
  );
}
