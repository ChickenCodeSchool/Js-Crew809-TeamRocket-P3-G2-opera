import path from "node:path";
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import database from "../../database/client";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });
console.log("DB_USER =", process.env.DB_USER);

const STATUSES = ["pending", "preparing", "shipped", "delivered"];
const START_DATE = new Date("2025-12-01");
const END_DATE = new Date("2026-02-10");

async function resetFakeData() {
  console.log("Suppression des anciennes données fake...");
  await database.query("DELETE FROM order_item");
  await database.query("DELETE FROM `order`");
  await database.query("DELETE FROM cart_item");
  await database.query("DELETE FROM cart");
  await database.query("DELETE FROM customers WHERE role = 0");
  console.log("Anciennes données fake supprimées !");
}

async function generateClients(count = 400) {
  const clients: (string | number | Date | null)[][] = [];

  for (let i = 0; i < count; i++) {
    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();
    const email = faker.internet.email({
      firstName: firstname,
      lastName: lastname,
    });
    const password = faker.internet.password();
    const birthday = faker.date.birthdate({ min: 18, max: 80, mode: "age" });
    const adress = faker.location.streetAddress();
    const country = faker.location.country();
    const postalCode = faker.location.zipCode();
    const phone = faker.phone.number();
    const created_at = faker.date.between({ from: START_DATE, to: END_DATE });
    const updated_at = faker.date.between({ from: created_at, to: END_DATE });

    clients.push([
      firstname,
      lastname,
      password,
      email,
      0,
      birthday,
      adress,
      country,
      postalCode,
      phone,
      created_at,
      updated_at,
    ]);
  }

  await database.query(
    `INSERT INTO customers
     (firstname, lastname, password, mail, role, birthday, adress, country, postal_code, phone, created_at, updated_at)
     VALUES ?`,
    [clients],
  );

  console.log(`${count} clients générés !`);
}

interface ProductRow extends RowDataPacket {
  product_id: number;
  price: number;
}

async function getAllProducts(): Promise<ProductRow[]> {
  const [rows] = await database.query<ProductRow[]>(
    "SELECT product_id, price FROM product",
  );
  return rows;
}

interface ClientRow extends RowDataPacket {
  customer_id: number;
}

async function generateCartsAndCartItems() {
  const [clients] = await database.query<ClientRow[]>(
    "SELECT customer_id FROM customers WHERE role = 0",
  );
  const products = await getAllProducts();

  for (const client of clients) {
    const nbCarts = faker.number.int({ min: 1, max: 3 });

    for (let c = 0; c < nbCarts; c++) {
      const createdAt = faker.date.between({ from: START_DATE, to: END_DATE });
      const [cartResult] = await database.query<ResultSetHeader>(
        "INSERT INTO cart (customer_id, created_at, updated_at) VALUES (?, ?, ?)",
        [client.customer_id, createdAt, createdAt],
      );
      const cartId = cartResult.insertId;

      const nbItems = faker.number.int({
        min: 1,
        max: Math.min(5, products.length),
      });

      const selectedProducts: ProductRow[] = [];
      const usedProductIds = new Set<number>();

      while (selectedProducts.length < nbItems) {
        const prod = faker.helpers.arrayElement(products);
        if (!usedProductIds.has(prod.product_id)) {
          selectedProducts.push(prod);
          usedProductIds.add(prod.product_id);
        }
      }

      for (const prod of selectedProducts) {
        const quantity = 1;
        await database.query<ResultSetHeader>(
          "INSERT INTO cart_item (cart_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)",
          [cartId, prod.product_id, quantity, prod.price],
        );
      }
    }
  }

  console.log("Carts et cart_items générés !");
}

async function generateOrders() {
  const [carts] = await database.query<RowDataPacket[]>(
    "SELECT cart_id, customer_id, created_at FROM cart ORDER BY created_at ASC",
  );

  const now = new Date();

  for (const cart of carts) {
    if (!faker.datatype.boolean()) continue;

    const createdAt = new Date(cart.created_at);
    const isRecent =
      createdAt > new Date(END_DATE.getTime() - 7 * 24 * 60 * 60 * 1000);
    let deliveryDate: Date | null = null;

    const status = isRecent
      ? "preparing"
      : faker.helpers.arrayElement(STATUSES);

    if (!isRecent) {
      deliveryDate = new Date(createdAt);
      deliveryDate.setDate(
        deliveryDate.getDate() + faker.number.int({ min: 2, max: 10 }),
      );
    }

    const [orderResult] = await database.query<ResultSetHeader>(
      "INSERT INTO `order` (price_total, status, customer_id, created_at, delivery_date) VALUES (?, ?, ?, ?, ?)",
      [0, status, cart.customer_id, createdAt, deliveryDate],
    );
    const orderId = orderResult.insertId;

    const [cartItems] = await database.query<RowDataPacket[]>(
      "SELECT cart_item_id, product_id, quantity, unit_price FROM cart_item WHERE cart_id = ?",
      [cart.cart_id],
    );

    let totalPrice = 0;
    for (const item of cartItems) {
      totalPrice += item.quantity * item.unit_price;
      await database.query<ResultSetHeader>(
        "INSERT INTO order_item (cart_item_id, order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?, ?)",
        [
          item.cart_item_id,
          orderId,
          item.product_id,
          item.quantity,
          item.unit_price,
        ],
      );
    }

    await database.query<ResultSetHeader>(
      "UPDATE `order` SET price_total = ? WHERE order_id = ?",
      [totalPrice, orderId],
    );
  }

  console.log("Commandes et order_items générés !");
}

async function seed() {
  try {
    await resetFakeData();
    await generateClients(400);
    await generateCartsAndCartItems();
    await generateOrders();
    console.log("Seed terminé !");
    process.exit(0);
  } catch (err) {
    console.error("Erreur seedFakeData :", err);
    process.exit(1);
  }
}

seed();
