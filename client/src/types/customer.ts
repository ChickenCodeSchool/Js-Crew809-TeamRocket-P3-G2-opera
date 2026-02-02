export interface Customer {
  customer_id: number;
  customer_number: string; // Ajoute-le s'il est utilisé pour les références
  firstname: string;
  lastname: string;
  mail: string;
  role: 0 | 1;
  birthday: string | null;
  adress: string | null; // Attention à l'orthographe "adress" avec un seul 'd' comme en BDD
  postal_code: string | null;
  country: string | null;
  phone: string | null;
  created_at: string | Date | null;
  updated_at?: string | Date | null;
}
