// Définition de l'union de types
export type OrderStatus = "pending" | "preparing" | "shipped" | "delivered";

export interface Order {
  order_id: number;
  total: number;
  status: OrderStatus; // On utilise l'union ici au lieu de string
  customer_id: number;
  created_at: string | Date;
  updated_at: string | Date | null;
  delivery_date: string | Date | null;
  date: string | number | Date;
}
