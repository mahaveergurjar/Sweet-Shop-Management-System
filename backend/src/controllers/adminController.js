import prisma from "../config/database.js";

export class AdminController {
  static async getDashboardStats(req, res) {
    try {
      // 1. Basic Stats
      const totalSweets = await prisma.sweet.count();
      const totalUsers = await prisma.user.count();
      const purchases = await prisma.purchase.findMany();

      const totalRevenue = purchases.reduce(
        (sum, p) => sum + Number(p.total_price),
        0,
      );
      const totalOrders = purchases.length;

      // 2. Sales by Category
      const categoryStats = {};
      purchases.forEach((p) => {
        const cat = p.sweet_category || "Uncategorized";
        categoryStats[cat] = (categoryStats[cat] || 0) + Number(p.total_price);
      });

      const salesByCategory = Object.entries(categoryStats)
        .map(([name, value]) => ({
          name,
          value: parseFloat(value.toFixed(2)),
        }))
        .sort((a, b) => b.value - a.value);

      // 3. Top Selling Sweets
      const sweetSales = {};
      purchases.forEach((p) => {
        const name = p.sweet_name || "Unknown";
        sweetSales[name] = (sweetSales[name] || 0) + p.quantity;
      });

      const topSweets = Object.entries(sweetSales)
        .map(([name, quantity]) => ({
          name,
          quantity,
        }))
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 5);

      // 4. Sales Trend (Last 7 Days)
      const last7Days = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        d.setHours(0, 0, 0, 0);
        last7Days.push({
          date: d.toISOString().split("T")[0],
          revenue: 0,
        });
      }

      purchases.forEach((p) => {
        const pDate = new Date(p.created_at).toISOString().split("T")[0];
        const trendDay = last7Days.find((d) => d.date === pDate);
        if (trendDay) {
          trendDay.revenue += Number(p.total_price);
        }
      });

      res.status(200).json({
        summary: {
          totalRevenue: parseFloat(totalRevenue.toFixed(2)),
          totalOrders,
          totalSweets,
          totalUsers,
        },
        salesByCategory,
        topSweets,
        salesTrend: last7Days,
      });
    } catch (error) {
      console.error("Dashboard stats error:", error);
      res.status(500).json({ error: "Failed to fetch dashboard statistics" });
    }
  }
}
