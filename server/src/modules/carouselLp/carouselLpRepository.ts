import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

type CarouselBrandPicture = {
  brand_picture_id: number;
  brand_id: number;
  url: string;
  is_main: number;
  type: string;
  brand_name: string;
};

class CarouselLpRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT brand_picture.*, brand.name AS brand_name 
       FROM brand_picture 
       JOIN brand ON brand_picture.brand_id = brand.brand_id 
       WHERE brand_picture.type LIKE '%landing_carousel%'`,
    );

    return rows as CarouselBrandPicture[];
  }
}

export default new CarouselLpRepository();
