// cartRepository.ts - Ajouter ces méthodes manquantes
import type { ResultSetHeader } from "mysql2";
import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

type Cart = {
  cart_id: number;
  customer_id: number;
  firstname: string;
  lastname: string;
  adress: string;
  country: string;
  email: string;
};

type CartItem = {
  cart_item_id: number;
  cart_id: number;
  product_id: number;
  size_id: number;
  quantity: number;
  unit_price: number;
};

type addCartItem = {
  cart_id: number;
  product_id: number;
  unit_price: number;
  quantity: number;
  size_id: number;
};

class CartRepository {
  async findAllCart() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM cart");
    return rows as Cart[];
  }

  async findbyCartId(cartId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM cart WHERE cart_id = ?",
      [cartId],
    );
    return rows as Cart[];
  }

  async findCartItem(cartId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT c.cart_id, ci.product_id, ci.quantity, ci.unit_price FROM operadb.cart c JOIN operadb.cart_item ci ON c.cart_id = ci.cart_id WHERE c.cart_id = ?;",
      [cartId],
    );
    return rows;
  }

  async addCartItem(data: addCartItem): Promise<number> {
    const [results] = await databaseClient.query<ResultSetHeader>(
      "INSERT INTO cart_item (cart_id, product_id, size_id, quantity, unit_price) VALUES (?, ?, ?, ?, ?)",
      [
        data.cart_id,
        data.product_id,
        data.size_id,
        data.quantity,
        data.unit_price,
      ],
    );

    const cartItemId = results.insertId;
    return cartItemId;
  }

  async findOrCreateCart(customerId: number): Promise<number> {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT cart_id FROM cart WHERE customer_id = ?",
      [customerId],
    );

    if ((rows as Cart[]).length > 0) {
      return (rows as Cart[])[0].cart_id;
    }

    const [result] = await databaseClient.query<ResultSetHeader>(
      "INSERT INTO cart (customer_id) VALUES (?)",
      [customerId],
    );

    return result.insertId;
  }

  async getCartItems(cartId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
        ci.cart_item_id,
        ci.cart_id,
        ci.product_id, 
        ci.quantity,
        ci.unit_price as price,
        p.name,
        -- pi.image_url,
        -- s.label as size_label,
        ci.size_id
      FROM cart_item ci
      JOIN product p ON ci.product_id = p.product_id
      -- LEFT JOIN product_image pi ON p.product_id = pi.product_id AND pi.is_primary = 1
      LEFT JOIN size s ON ci.size_id = s.size_id
      WHERE ci.cart_id = ?`,
      [cartId],
    );
    return rows;
  }

  async updateCartItemQuantity(cartItemId: number, quantity: number) {
    await databaseClient.query(
      "UPDATE cart_item SET quantity = ? WHERE cart_item_id = ?",
      [quantity, cartItemId],
    );
  }

  async removeCartItem(cartItemId: number) {
    await databaseClient.query("DELETE FROM cart_item WHERE cart_item_id = ?", [
      cartItemId,
    ]);
  }

  async findCartItemByProductAndSize(
    cartId: number,
    productId: number,
    sizeId: number,
  ) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM cart_item WHERE cart_id = ? AND product_id = ? AND size_id = ?",
      [cartId, productId, sizeId],
    );
    return rows[0] as CartItem | undefined;
  }
}

export default new CartRepository();
