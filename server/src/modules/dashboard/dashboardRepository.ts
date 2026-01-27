import type { RowDataPacket } from "mysql2/promise";
import database from "../../../database/client";

export default class DashboardRepository {
  async revenuePerMonth(): Promise<{ month: string; total: number }[]> {
    const [rows] = await database.query<RowDataPacket[]>(
      `SELECT DATE_FORMAT(created_at, '%Y-%m') AS month, SUM(price_total) AS total
       FROM \`order\`
       GROUP BY month
       ORDER BY month`,
    );

    return rows.map((r) => ({
      month: r.month,
      total: Number(r.total),
    }));
  }

  async getTopProducts(
    limit = 10,
  ): Promise<{ product_id: number; name: string; totalSold: number }[]> {
    const [rows] = await database.query<RowDataPacket[]>(
      `SELECT p.product_id, p.name, SUM(oi.quantity) AS totalSold
       FROM order_item oi
       JOIN product p ON oi.product_id = p.product_id
       GROUP BY p.product_id
       ORDER BY totalSold DESC
       LIMIT ?`,
      [limit],
    );

    return rows.map((r) => ({
      product_id: r.product_id,
      name: r.name,
      totalSold: Number(r.totalSold),
    }));
  }

  async itemsPerDay(): Promise<{ day: string; totalItems: number }[]> {
    const [rows] = await database.query<RowDataPacket[]>(
      `SELECT DATE(o.created_at) AS day, SUM(oi.quantity) AS totalItems
       FROM \`order\` o
       JOIN order_item oi ON o.order_id = oi.order_id
       GROUP BY day
       ORDER BY day`,
    );

    return rows.map((r) => ({
      day: r.day,
      totalItems: Number(r.totalItems),
    }));
  }

  async customersPerDay(): Promise<{ day: string; totalCustomers: number }[]> {
    const [rows] = await database.query<RowDataPacket[]>(
      `SELECT DATE(o.created_at) AS day, COUNT(DISTINCT o.customer_id) AS totalCustomers
       FROM \`order\` o
       GROUP BY day
       ORDER BY day`,
    );

    return rows.map((r) => ({
      day: r.day,
      totalCustomers: Number(r.totalCustomers),
    }));
  }
}
