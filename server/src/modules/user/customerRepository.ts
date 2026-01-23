import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

export type Customer = {
  customer_id: number;
  firstname: string;
  lastname: string;
  mail: string;
  password: string;
  role: 0 | 1;
  birthday: string | null;
  adress: string | null;
  postal_code: string | null;
  country: string | null;
  phone: string | null;
  created_at: Date | null;
  updated_at: Date | null;
};

class CustomerRepository {
  async create(
    customer: Omit<Customer, "customer_id" | "created_at" | "updated_at">,
  ) {
    const [result] = await databaseClient.query<Result>(
      `INSERT INTO customers 
       (firstname, lastname, mail, password, role, birthday, adress, postal_code, country, phone, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ? , NOW(), NOW())`,
      [
        customer.firstname,
        customer.lastname,
        customer.mail,
        customer.password,
        customer.role,
        customer.birthday,
        customer.adress,
        customer.postal_code,
        customer.country,
        customer.phone,
      ],
    );
    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM customers WHERE customer_id = ?",
      [id],
    );
    return rows[0] as Customer;
  }

  async readByEmailWithPassword(mail: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM customers WHERE mail = ?",
      [mail],
    );
    return rows[0] as Customer;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM customers");
    return rows as Customer[];
  }

  async update(
    customer: Partial<
      Omit<Customer, "customer_id" | "created_at" | "updated_at">
    > & { customer_id: number },
  ) {
    const updates: string[] = [];
    const values: (string | number | null)[] = [];

    if (customer.firstname !== undefined) {
      updates.push("firstname = ?");
      values.push(customer.firstname);
    }
    if (customer.lastname !== undefined) {
      updates.push("lastname = ?");
      values.push(customer.lastname);
    }
    if (customer.mail !== undefined) {
      updates.push("mail = ?");
      values.push(customer.mail);
    }
    if (customer.password !== undefined) {
      updates.push("password = ?");
      values.push(customer.password);
    }
    if (customer.role !== undefined) {
      updates.push("role = ?");
      values.push(customer.role);
    }
    if (customer.birthday !== undefined) {
      updates.push("birthday = ?");
      values.push(customer.birthday);
    }
    if (customer.adress !== undefined) {
      updates.push("adress = ?");
      values.push(customer.adress);
    }
    if (customer.postal_code !== undefined) {
      updates.push("postal_code = ?");
      values.push(customer.postal_code);
    }
    if (customer.country !== undefined) {
      updates.push("country = ?");
      values.push(customer.country);
    }
    if (customer.phone !== undefined) {
      updates.push("phone = ?");
      values.push(customer.phone);
    }

    if (updates.length === 0) return 0;
    updates.push("updated_at = NOW()");
    values.push(customer.customer_id);

    const [result] = await databaseClient.query<Result>(
      `UPDATE customers SET ${updates.join(", ")} WHERE customer_id = ?`,
      values,
    );
    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM customers WHERE customer_id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new CustomerRepository();
