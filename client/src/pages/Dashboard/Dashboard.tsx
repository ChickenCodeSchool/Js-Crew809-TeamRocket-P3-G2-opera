import { useEffect, useMemo, useState } from "react";
import "./Dashboard.css";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
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
  timestamp: number;
}
interface CustomersPerDay {
  day: string;
  totalCustomers: number;
  timestamp: number;
}

interface RawItemsData {
  day: string;
  totalItems: number;
}
interface RawCustomersData {
  day: string;
  totalCustomers: number;
}

const SILVER_MAIN = "#E5E5E5";
const SILVER_MUTED = "#A6A6A6";
const SILVER_DARK = "#4D4D4D";

const PIE_COLORS = ["#E5E5E5", "#9A9A9A", "#2B2B2B"];

const BAR_COLORS = ["#F0F0F0", "#2B2B2B", "#9E9E9E", "#6B6B6B", "#CFCFCF"];

export default function Dashboard() {
  const [revenue, setRevenue] = useState<RevenueData[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [itemsPerDay, setItemsPerDay] = useState<ItemsPerDay[]>([]);
  const [customersPerDay, setCustomersPerDay] = useState<CustomersPerDay[]>([]);
  const [loading, setLoading] = useState(true);

  const sharedTooltipStyle = useMemo(
    () => ({
      backgroundColor: "#1A1A1A",
      border: `1px solid ${SILVER_DARK}`,
      color: SILVER_MAIN,
      fontWeight: 600,
      borderRadius: "8px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.6)",
      padding: "8px 12px",
      fontSize: "13px",
    }),
    [],
  );

  useEffect(() => {
    let isMounted = true;

    async function fetchAll() {
      try {
        const baseUrl = import.meta.env.VITE_API_URL;
        const [revRes, prodRes, itemsRes, custRes] = await Promise.all([
          fetch(`${baseUrl}/api/dashboard/revenue`),
          fetch(`${baseUrl}/api/dashboard/top-products?limit=5`),
          fetch(`${baseUrl}/api/dashboard/items-per-day`),
          fetch(`${baseUrl}/api/dashboard/customers-per-day`),
        ]);

        const rev: RevenueData[] = await revRes.json();
        const prod: TopProduct[] = await prodRes.json();
        const items: RawItemsData[] = await itemsRes.json();
        const customers: RawCustomersData[] = await custRes.json();

        if (isMounted) {
          setRevenue(rev);
          setTopProducts(prod);
          setItemsPerDay(
            items.map((i) => ({
              ...i,
              timestamp: new Date(i.day).getTime(),
            })),
          );
          setCustomersPerDay(
            customers.map((c) => ({
              ...c,
              timestamp: new Date(c.day).getTime(),
            })),
          );
        }
      } catch (e) {
        console.error("Erreur de chargement des données :", e);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchAll();
    return () => {
      isMounted = false;
    };
  }, []);

  const totalRevenue = useMemo(
    () => revenue.reduce((a, r) => a + r.total, 0),
    [revenue],
  );

  const totalItems = useMemo(
    () => itemsPerDay.reduce((a, i) => a + i.totalItems, 0),
    [itemsPerDay],
  );

  const totalCustomers = useMemo(
    () => customersPerDay.reduce((a, c) => a + c.totalCustomers, 0),
    [customersPerDay],
  );

  if (loading) return <div className="dashboard-loading">Chargement…</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-top">
        <section className="dashboard-section dashboard-left">
          <ResponsiveContainer width={500} height={500}>
            <PieChart>
              <Pie
                data={revenue}
                dataKey="total"
                nameKey="month"
                cx="50%"
                cy="50%"
                outerRadius={200}
                paddingAngle={4}
                stroke="#111318"
                strokeWidth={2}
              >
                {revenue.map((entry, index) => (
                  <Cell
                    key={`pie-${entry.month}`}
                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                cursor={false}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;

                  const date = new Date(payload[0].name);
                  const formatted = date.toLocaleDateString("fr-FR", {
                    month: "long",
                    year: "numeric",
                  });
                  const formattedCapitalized =
                    formatted.charAt(0).toUpperCase() + formatted.slice(1);

                  return (
                    <div style={sharedTooltipStyle}>
                      <div style={{ color: "#FFFFFF", marginBottom: 4 }}>
                        {formattedCapitalized}
                      </div>
                      <div style={{ color: SILVER_MUTED }}>
                        {Number(payload[0].value).toLocaleString()} €
                      </div>
                    </div>
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="section-footer">
            <h3 className="section-title">Chiffre d'affaires</h3>
            <p className="section-kpi">{totalRevenue.toLocaleString()}€</p>
          </div>
        </section>

        <section className="dashboard-section dashboard-right">
          <ResponsiveContainer width="100%" height={450}>
            <BarChart
              data={topProducts}
              margin={{ top: 30, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid
                stroke="#2D2D2D"
                strokeDasharray="3 3"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                tick={false}
                axisLine={{ stroke: "#333" }}
              />
              <YAxis
                tick={{ fill: SILVER_MUTED }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: "#222", opacity: 0.4 }}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  return (
                    <div style={sharedTooltipStyle}>
                      <div style={{ color: "#FFFFFF", marginBottom: 4 }}>
                        {payload[0].payload.name}
                      </div>
                      <div style={{ color: SILVER_MUTED }}>
                        {payload[0].value} ventes
                      </div>
                    </div>
                  );
                }}
              />
              <Bar dataKey="totalSold" barSize={36} radius={[8, 8, 0, 0]}>
                {topProducts.map((entry, index) => (
                  <Cell
                    key={entry.product_id}
                    fill={BAR_COLORS[index % BAR_COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="section-footer">
            <h3 className="section-title">Produits les plus vendus</h3>
          </div>
        </section>
      </div>

      <div className="dashboard-bottom">
        <section className="dashboard-section">
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={customersPerDay}>
              <defs>
                <linearGradient id="areaCustomers" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor={SILVER_MUTED}
                    stopOpacity={0.2}
                  />
                  <stop
                    offset="100%"
                    stopColor={SILVER_MUTED}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                stroke="#2D2D2D"
                strokeDasharray="3 3"
                vertical={false}
              />
              <XAxis
                dataKey="timestamp"
                type="number"
                scale="time"
                tick={false}
                axisLine={false}
                domain={["dataMin", "dataMax"]}
              />
              <YAxis
                tick={{ fill: SILVER_MUTED, fontWeight: 500 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  return (
                    <div style={sharedTooltipStyle}>
                      <div style={{ color: "#FFFFFF", marginBottom: 4 }}>
                        {new Date(label as number).toLocaleDateString()}
                      </div>
                      <div style={{ color: SILVER_MUTED }}>
                        {payload[0].value} clients
                      </div>
                    </div>
                  );
                }}
              />
              <Area
                type="monotone"
                dataKey="totalCustomers"
                stroke={SILVER_MUTED}
                strokeWidth={3}
                fill="url(#areaCustomers)"
                activeDot={{ r: 6, fill: SILVER_MUTED }}
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="section-footer">
            <h3 className="section-title">Clients</h3>
            <p className="section-kpi">
              {totalCustomers.toLocaleString()} clients
            </p>
          </div>
        </section>

        <section className="dashboard-section">
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={itemsPerDay}>
              <defs>
                <linearGradient id="areaItems" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor={SILVER_MUTED}
                    stopOpacity={0.2}
                  />
                  <stop
                    offset="100%"
                    stopColor={SILVER_MUTED}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                stroke="#2D2D2D"
                strokeDasharray="3 3"
                vertical={false}
              />
              <XAxis
                dataKey="timestamp"
                type="number"
                scale="time"
                tick={false}
                axisLine={false}
                domain={["dataMin", "dataMax"]}
              />
              <YAxis
                tick={{ fill: SILVER_MUTED, fontWeight: 500 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  return (
                    <div style={sharedTooltipStyle}>
                      <div style={{ color: "#FFFFFF", marginBottom: 4 }}>
                        {new Date(label as number).toLocaleDateString()}
                      </div>
                      <div style={{ color: SILVER_MUTED }}>
                        {payload[0].value} articles
                      </div>
                    </div>
                  );
                }}
              />
              <Area
                type="monotone"
                dataKey="totalItems"
                stroke={SILVER_MUTED}
                strokeWidth={3}
                fill="url(#areaItems)"
                activeDot={{ r: 6, fill: SILVER_MUTED }}
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="section-footer">
            <h3 className="section-title">Articles vendus</h3>
            <p className="section-kpi">
              {totalItems.toLocaleString()} articles
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
