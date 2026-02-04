/*// Dans src/data/mockCustomers.ts
import type { Customer } from "../types/customer";

// Une fonction pour générer un client rapidement
const createFakeCustomer = (
  id: number,
  firstname: string,
  lastname: string,
): Customer => {
  return {
    customer_id: id,
    // Génération d'un numéro aléatoire : CUST- suivi de 5 chiffres au hasard
    customer_number: `CUST-${Math.floor(10000 + Math.random() * 90000)}`,
    firstname: firstname,
    lastname: lastname,
    mail: `${firstname.toLowerCase()}.${lastname.toLowerCase()}@example.com`,
    role: Math.random() > 0.5 ? 1 : 0, // Aléatoire entre Admin (1) et User (0)
    created_at: new Date().toISOString().split("T")[0], // Date du jour
  };
};

export const mockCustomers: Customer[] = [
  createFakeCustomer(1, "Sofian", "Hanni"),
  createFakeCustomer(2, "Jean", "Dupont"),
  createFakeCustomer(3, "Marie", "Curie"),
];*/
