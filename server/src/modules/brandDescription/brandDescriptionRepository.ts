import databaseClient from "../../../database/client";

import type { RowDataPacket } from "mysql2";

class BrandDescriptionRepository {
  async read(id: number) {
    const [rows] = await databaseClient.query<RowDataPacket[]>(
      `SELECT b.Brand_id, b.name, b.description, bp.url 
       FROM brand b 
       LEFT JOIN brand_picture bp ON b.Brand_id = bp.brand_id AND bp.type = 'logo_black' 
       WHERE b.Brand_id = ?`,
      [id],
    );

    return rows[0];
  }
}

export default new BrandDescriptionRepository();
