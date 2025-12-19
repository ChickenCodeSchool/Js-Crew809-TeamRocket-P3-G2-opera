import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type LandingBackground = {
  brand_picture_id: number;
  url: string;
  brand_id: number;
};

class LandingRepository {
  async getBackgrounds(): Promise<LandingBackground[]> {
    const query = `SELECT brand_picture_id, url, brand_id
        FROM brand_picture
        WHERE type="background"
        `;
    const [rows] = await databaseClient.query(query);
    return rows as LandingBackground[];
  }
}

export default new LandingRepository();
