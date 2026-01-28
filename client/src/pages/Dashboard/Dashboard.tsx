import { useEffect, useState } from "react";
import "./Dashboard.css";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { Payload } from "recharts/types/component/DefaultTooltipContent";

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

  const [topN, setTopN] = useState(5);
  const [monthFilter, setMonthFilter] = useState("all");

  useEffect(() => {
    async function fetchData() {
      try {
        const [revRes, prodRes, itemsRes, custRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/api/dashboard/revenue`).then(
            (r) => r.json(),
          ),
          fetch(
            `${import.meta.env.VITE_API_URL}/api/dashboard/top-products?limit=${topN}`,
          ).then((r) => r.json()),
          fetch(
            `${import.meta.env.VITE_API_URL}/api/dashboard/items-per-day`,
          ).then((r) => r.json()),
          fetch(
            `${import.meta.env.VITE_API_URL}/api/dashboard/customers-per-day`,
          ).then((r) => r.json()),
        ]);

        setRevenue(
          monthFilter === "all"
            ? revRes
            : revRes.filter((r: RevenueData) => r.month === monthFilter),
        );
        setTopProducts(prodRes);
        setItemsPerDay(itemsRes);
        setCustomersPerDay(custRes);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [topN, monthFilter]);

  const totalRevenue = revenue.reduce((acc, r) => acc + r.total, 0);
  const totalProductsSold = topProducts.reduce(
    (acc, p) => acc + p.totalSold,
    0,
  );
  const totalItems = itemsPerDay.reduce((acc, i) => acc + i.totalItems, 0);
  const totalCustomers = customersPerDay.reduce(
    (acc, c) => acc + c.totalCustomers,
    0,
  );

  if (loading)
    return <div className="dashboard-loading">Chargement du dashboard...</div>;

  const formatDateTooltip = (
    label: React.ReactNode,
    _payload: readonly Payload<number, string>[],
  ) => {
    if (typeof label === "string" || typeof label === "number") {
      return new Date(label).toLocaleDateString();
    }
    return "";
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-filters">
        <label>
          Filtrer par mois :
          <select
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
          >
            <option value="all">Tous</option>
            {revenue.map((r) => (
              <option key={r.month} value={r.month}>
                {r.month}
              </option>
            ))}
          </select>
        </label>

        <label>
          {/* Produits les plus vendus :*/}
          <select
            value={topN}
            onChange={(e) => setTopN(Number(e.target.value))}
          >
            {[5, 10, 15, 20].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="dashboard-grid">
        <DashboardCard
          title="Chiffre d'affaires"
          kpi={`€ ${totalRevenue.toLocaleString()}`}
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value: number | undefined) =>
                  value != null ? `€ ${value.toLocaleString()}` : "€ 0"
                }
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#4e54c8"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </DashboardCard>

        <DashboardCard
          title="Produits les plus vendus"
          kpi={`${totalProductsSold} vendus`}
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalSold" fill="#82ca9d" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </DashboardCard>

        <DashboardCard
          title="Articles vendus par jour"
          kpi={`${totalItems} articles`}
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={itemsPerDay}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="day"
                tickFormatter={(d) => new Date(d).toLocaleDateString()}
              />
              <YAxis />
              <Tooltip labelFormatter={formatDateTooltip} />
              <Legend />
              <Line
                type="monotone"
                dataKey="totalItems"
                stroke="#ff7300"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </DashboardCard>

        <DashboardCard
          title="Clients uniques par jour"
          kpi={`${totalCustomers} clients`}
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={customersPerDay}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="day"
                tickFormatter={(d) => new Date(d).toLocaleDateString()}
              />
              <YAxis />
              <Tooltip labelFormatter={formatDateTooltip} />
              <Legend />
              <Line
                type="monotone"
                dataKey="totalCustomers"
                stroke="#0088FE"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </DashboardCard>
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  kpi,
  children,
}: { title: string; kpi?: string; children: React.ReactNode }) {
  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">{title}</div>
      {kpi && <div className="dashboard-card-kpi">{kpi}</div>}
      <div className="dashboard-card-body">{children}</div>
    </div>
  );
}
