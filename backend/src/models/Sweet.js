import prisma from "../config/database.js";

export class SweetModel {
  static async create(input) {
    return await prisma.sweet.create({
      data: {
        name: input.name,
        category: input.category,
        price: input.price,
        quantity: input.quantity || 0,
        unit: input.unit || "piece",
        image_url: input.image_url || null,
      },
    });
  }

  static async findAll() {
    return await prisma.sweet.findMany({
      orderBy: { created_at: "desc" },
    });
  }

  static async findById(id) {
    return await prisma.sweet.findUnique({
      where: { id: parseInt(id) },
    });
  }

  static async search(filters) {
    const where = {};

    if (filters.name) {
      where.name = { contains: filters.name, mode: "insensitive" };
    }

    if (filters.category) {
      where.category = { contains: filters.category, mode: "insensitive" };
    }

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      where.price = {};
      if (filters.minPrice !== undefined)
        where.price.gte = parseFloat(filters.minPrice);
      if (filters.maxPrice !== undefined)
        where.price.lte = parseFloat(filters.maxPrice);
    }

    return await prisma.sweet.findMany({
      where,
      orderBy: { created_at: "desc" },
    });
  }

  static async update(id, input) {
    return await prisma.sweet.update({
      where: { id: parseInt(id) },
      data: {
        ...input,
        updated_at: new Date(),
      },
    });
  }

  static async delete(id) {
    try {
      await prisma.sweet.delete({
        where: { id: parseInt(id) },
      });
      return true;
    } catch (err) {
      return false;
    }
  }

  static async purchase(id, quantity) {
    return await prisma.$transaction(async (tx) => {
      const sweet = await tx.sweet.findUnique({
        where: { id: parseInt(id) },
      });

      if (!sweet || sweet.quantity < quantity) {
        throw new Error("Insufficient quantity");
      }

      return await tx.sweet.update({
        where: { id: parseInt(id) },
        data: {
          quantity: { decrement: quantity },
          updated_at: new Date(),
        },
      });
    });
  }

  static async restock(id, quantity) {
    return await prisma.sweet.update({
      where: { id: parseInt(id) },
      data: {
        quantity: { increment: quantity },
        updated_at: new Date(),
      },
    });
  }
}
