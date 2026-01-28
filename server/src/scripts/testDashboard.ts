import DashboardRepository from "../modules/dashboard/dashboardRepository";

async function testDashboard() {
  const repo = new DashboardRepository();

  try {
    const revenue = await repo.revenuePerMonth();
    console.log("=== Revenue par mois ===");
    console.table(revenue);

    const topProducts = await repo.getTopProducts(5);
    console.log("=== Top 5 produits ===");
    console.table(topProducts);

    const itemsDay = await repo.itemsPerDay();
    console.log("=== Articles vendus par jour ===");
    console.table(itemsDay.slice(0, 10));

    const customersDay = await repo.customersPerDay();
    console.log("=== Clients uniques par jour ===");
    console.table(customersDay.slice(0, 10));

    console.log("✅ Test terminé !");
  } catch (err) {
    console.error("❌ Erreur lors du test dashboard :", err);
  }
}

testDashboard();
