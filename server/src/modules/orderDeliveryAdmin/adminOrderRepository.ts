import database from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class AdminOrderRepository {
  async readAll() {
    const [rows] = await database.query<Rows>(
      `
      SELECT 
        o.order_id, 
        o.created_at, 
        o.delivery_date, 
        o.price_total, 
        o.status, 
        c.customer_id,
        c.firstname, 
        c.lastname
      FROM \`order\` o
      JOIN customers c ON o.customer_id = c.customer_id
      ORDER BY o.created_at DESC
      `,
    );
    return rows;
  }

  // Suppression d'une commande
  async delete(orderId: number) {
    // 1. Supprimer les articles liés
    await database.query("DELETE FROM order_item WHERE order_id = ?", [
      orderId,
    ]);

    // 2. Supprimer la commande
    const [result] = await database.query<Result>(
      "DELETE FROM `order` WHERE order_id = ?",
      [orderId],
    );
    return result.affectedRows;
  }
}

export default new AdminOrderRepository();
