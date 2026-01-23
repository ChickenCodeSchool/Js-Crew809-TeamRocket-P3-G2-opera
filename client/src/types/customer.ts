export interface Customer {
  customer_id: number;
  firstname: string;
  lastname: string;
  mail: string;
  role: number; // 0 = client, 1 = admin
  created_at?: string;
}
