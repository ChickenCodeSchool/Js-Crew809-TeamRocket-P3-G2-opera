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
        c.lastname,
        IF(COUNT(oi.product_id) = 0, JSON_ARRAY(), JSON_ARRAYAGG(
          JSON_OBJECT(
            'product_id', p.product_id,
            'name', p.name,
            'quantity', oi.quantity
          )
        )) AS items
      FROM \`order\` o
      JOIN customers c ON o.customer_id = c.customer_id
      LEFT JOIN order_item oi ON o.order_id = oi.order_id
      LEFT JOIN product p ON oi.product_id = p.product_id
      GROUP BY o.order_id
      ORDER BY o.order_id DESC
      `,
    );
    return rows;
  }

  async delete(orderId: number) {
    await database.query("DELETE FROM order_item WHERE order_id = ?", [
      orderId,
    ]);
    const [result] = await database.query<Result>(
      "DELETE FROM `order` WHERE order_id = ?",
      [orderId],
    );
    return result.affectedRows;
  }

  async update(
    orderId: number,
    data: {
      created_at: string;
      delivery_date: string | null;
      status: string;
    },
  ) {
    const [result] = await database.query<Result>(
      "UPDATE `order` SET created_at = ?, delivery_date = ?, status = ? WHERE order_id = ?",
      [data.created_at, data.delivery_date, data.status, orderId],
    );
    return result.affectedRows;
  }

  async removeItem(orderId: number, productId: number) {
    await database.query(
      "DELETE FROM order_item WHERE order_id = ? AND product_id = ?",
      [orderId, productId],
    );

    await database.query(
      `UPDATE \`order\` 
       SET price_total = (
         SELECT COALESCE(SUM(unit_price * quantity), 0)
         FROM order_item 
         WHERE order_id = ?
       )
       WHERE order_id = ?`,
      [orderId, orderId],
    );

    return true;
  }
}

export default new AdminOrderRepository();
