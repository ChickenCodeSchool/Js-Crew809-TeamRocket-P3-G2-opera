import database from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class OrderRepository {
  // 1. Liste des commandes pour un client
  async readByCustomerId(customerId: number) {
    const [rows] = await database.query<Rows>(
      `
      SELECT 
        o.order_id,
        o.created_at AS date,
        o.price_total AS total,
        o.status,
        o.delivery_date,
        -- Agrégation des articles en JSON
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'product_id', p.product_id,
            'name', p.name,
            'image_url', IFNULL(pi.url, '/images/placeholder.png'), -- Image par défaut si null
            'quantity', oi.quantity
          )
        ) AS items
      FROM \`order\` o
      JOIN order_item oi ON o.order_id = oi.order_id
      JOIN product p ON oi.product_id = p.product_id
      LEFT JOIN product_image pi ON p.product_id = pi.product_id AND pi.is_main = 1
      WHERE o.customer_id = ?
      GROUP BY o.order_id
      ORDER BY o.created_at DESC
      `,
      [customerId],
    );
    return rows;
  }

  // 2. Détail d'une commande spécifique
  async read(orderId: number) {
    const [rows] = await database.query<Rows>(
      `
      SELECT 
        o.order_id,
        o.created_at AS date,
        o.price_total AS total,
        o.status,
        o.delivery_date,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'product_id', p.product_id,
            'name', p.name,
            'image_url', IFNULL(pi.url, '/images/placeholder.png'),
            'quantity', oi.quantity,
            'unit_price', oi.unit_price
          )
        ) AS items
      FROM \`order\` o
      JOIN order_item oi ON o.order_id = oi.order_id
      JOIN product p ON oi.product_id = p.product_id
      LEFT JOIN product_image pi ON p.product_id = pi.product_id AND pi.is_main = 1
      WHERE o.order_id = ?
      GROUP BY o.order_id
      `,
      [orderId],
    );
    return rows[0];
  }
}

export default new OrderRepository();
