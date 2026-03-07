import prisma from "../config/database.js";

export class PurchaseModel {
  static async create(input) {
    return await prisma.purchase.create({
      data: {
        user_id: input.user_id,
        sweet_id: input.sweet_id,
        quantity: input.quantity,
        unit: input.unit || "piece",
        price_per_unit: input.price_per_unit,
        total_price: input.total_price,
        sweet_name: input.sweet_name,
        sweet_category: input.sweet_category,
      },
    });
  }

  static async findByUserId(userId) {
    return await prisma.purchase.findMany({
      where: { user_id: parseInt(userId) },
      orderBy: { created_at: "desc" },
      include: {
        sweet: true,
      },
    });
  }

  static async createBatch(userId, items) {
    return await prisma.$transaction(async (tx) => {
      const results = [];
      for (const item of items) {
        // 1. Check and decrement stock
        const sweet = await tx.sweet.findUnique({
          where: { id: parseInt(item.sweet_id) },
        });

        if (!sweet || sweet.quantity < item.quantity) {
          throw new Error(
            `Insufficient stock for ${item.sweet_name || "sweet"}`,
          );
        }

        await tx.sweet.update({
          where: { id: parseInt(item.sweet_id) },
          data: {
            quantity: { decrement: item.quantity },
            updated_at: new Date(),
          },
        });

        // 2. Create purchase record
        const purchase = await tx.purchase.create({
          data: {
            user_id: parseInt(userId),
            sweet_id: parseInt(item.sweet_id),
            quantity: item.quantity,
            unit: sweet.unit,
            price_per_unit: item.price_per_unit,
            total_price: item.total_price,
            sweet_name: item.sweet_name,
            sweet_category: item.sweet_category,
          },
        });
        results.push(purchase);
      }
      return results;
    });
  }
}
