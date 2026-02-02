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

  // 3. Créer une nouvelle commande
  async create(orderData: {
    customer_id: number;
    price_total: number;
    status: string;
    stripe_session_id: string;
  }) {
    const [result] = await database.query<Result>(
      `INSERT INTO \`order\` (customer_id, price_total, status, stripe_session_id, created_at) 
       VALUES (?, ?, ?, ?, NOW())`,
      [
        orderData.customer_id,
        orderData.price_total,
        orderData.status,
        orderData.stripe_session_id,
      ],
    );
    return result.insertId;
  }

  // 4. Récupérer les détails complets d'une commande avec infos client
  async readWithDetails(orderId: number) {
    const [rows] = await database.query<Rows>(
      `
      SELECT 
        o.order_id,
        o.created_at,
        o.price_total AS total_amount,
        o.status,
        c.customer_id,
        c.firstname,
        c.lastname,
        c.mail,
        c.adress,
        c.postal_code,
        c.country,
        c.phone,
        oi.quantity,
        oi.unit_price AS price,
        p.name as product_name,
        s.size_label,
        pi.url as image_url
      FROM \`order\` o
      JOIN customers c ON o.customer_id = c.customer_id
      JOIN order_item oi ON o.order_id = oi.order_id
      JOIN product p ON oi.product_id = p.product_id
      LEFT JOIN size s ON oi.size_id = s.size_id
      LEFT JOIN product_image pi ON p.product_id = pi.product_id AND pi.is_main = 1
      WHERE o.order_id = ?`,
      [orderId],
    );

    if (rows.length === 0) {
      console.error("❌ Aucune commande trouvée pour order_id:", orderId);
      return null;
    }

    console.log("📦 Rows trouvées:", rows);

    const order = {
      order_id: rows[0].order_id,
      order_number: `ORD-${rows[0].order_id}`,
      total_amount: rows[0].total_amount,
      created_at: rows[0].created_at,
      customers: {
        customer_id: rows[0].customer_id,
        firstname: rows[0].firstname,
        lastname: rows[0].lastname,
        mail: rows[0].mail,
        adress: rows[0].adress,
        postal_code: rows[0].postal_code,
        country: rows[0].country,
        phone: rows[0].phone,
      },
      items: rows.map((row) => ({
        product_name: row.product_name,
        quantity: row.quantity,
        price: row.price,
        size_label: row.size_label,
        image_url: row.image_url,
      })),
    };
    console.log("✅ Order formatée:", order);
    return order;
  }
}

export default new OrderRepository();
