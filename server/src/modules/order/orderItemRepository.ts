import database from "../../../database/client";
import type { Result } from "../../../database/client";

class OrderItemRepository {
  async create(orderItem: {
    order_id: number;
    product_id: number;
    size_id: number | null;
    quantity: number;
    unit_price: number;
  }) {
    const [result] = await database.query<Result>(
      `INSERT INTO order_item (order_id, product_id, size_id, quantity, unit_price) 
       VALUES (?, ?, ?, ?, ?)`,
      [
        orderItem.order_id,
        orderItem.product_id,
        orderItem.size_id,
        orderItem.quantity,
        orderItem.unit_price,
      ],
    );
    return result.insertId;
  }
}

export default new OrderItemRepository();
