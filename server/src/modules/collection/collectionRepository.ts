import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

type BrandPicture = {
  brand_picture_id: number;
  brand_id: number;
  url: string;
  is_main: number;
  type: string;
  brand_name: string;
};

class CollectionRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT brand_picture.*, brand.name AS brand_name 
       FROM brand_picture 
       JOIN brand ON brand_picture.brand_id = brand.brand_id 
       WHERE brand_picture.type LIKE '%logo%' OR brand_picture.type LIKE '%collection%'`,
    );

    return rows as BrandPicture[];
  }
}

export default new CollectionRepository();
