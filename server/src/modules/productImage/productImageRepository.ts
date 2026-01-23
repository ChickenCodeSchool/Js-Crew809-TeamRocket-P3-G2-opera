import type { ResultSetHeader } from "mysql2";
import databaseClient from "../../../database/client";

type ProductImageInsert = {
  productId: number;
  url: string;
  isMain: boolean;
};

const insert = async ({
  productId,
  url,
  isMain,
}: ProductImageInsert): Promise<void> => {
  try {
    const [result] = await databaseClient.query<ResultSetHeader>(
      `INSERT INTO product_image (product_id, url, is_main)
       VALUES (?, ?, ?)`,
      [productId, url, isMain ? 1 : 0],
    );
  } catch (error) {}
};

export default { insert };
