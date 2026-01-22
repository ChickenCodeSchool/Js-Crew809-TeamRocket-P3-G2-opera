import databaseClient from "../../../database/client";
export type brandHero = {
  Brand_id: number;
  name: string;
  url_minihero: string;
  url_hero: string;
};
export type Brand = {
  brand_id: number;
  name: string;
};

class brandRepository {
  async getOne(brandId: number): Promise<brandHero[]> {
    const query = `
        SELECT 
          Brand_id,
          name,
          url_minihero, 
          url_hero
        FROM brand
        WHERE Brand_id = ?
        `;
    const [rows] = await databaseClient.query(query, [brandId]);
    const result = rows as brandHero[];
    return result;
  }

  async getAll(): Promise<Brand[]> {
    const query = `
        SELECT 
          Brand_id as brand_id,
          name
        FROM brand
        ORDER BY name
        `;
    const [rows] = await databaseClient.query(query);
    return rows as Brand[];
  }
}

export default new brandRepository();
