export interface Customer {
  customer_id: number;
  customer_number: string;
  firstname: string;
  lastname: string;
  mail: string;
  role: number; // 0 = client, 1 = admin
  created_at?: string;
}
