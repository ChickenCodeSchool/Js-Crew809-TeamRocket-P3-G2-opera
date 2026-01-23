import type { Customer } from "../types/customer";

export const mockCustomers: Customer[] = [
  {
    customer_id: 1,
    firstname: "Sofian",
    lastname: "Admin",
    mail: "sofian@colisee.fr",
    role: 1,
    created_at: "2024-01-01",
  },
  {
    customer_id: 2,
    firstname: "Client",
    lastname: "Lambda",
    mail: "client@gmail.com",
    role: 0,
    created_at: "2024-02-10",
  },
];
