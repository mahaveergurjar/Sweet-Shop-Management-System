import prisma from "../config/database.js";
import bcrypt from "bcryptjs";

export class UserModel {
  static async create(input) {
    const passwordHash = await bcrypt.hash(input.password, 10);
    const user = await prisma.user.create({
      data: {
        email: input.email,
        password_hash: passwordHash,
        is_admin: input.isAdmin || false,
      },
    });
    return user;
  }

  static async findByEmail(email) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  static async findById(id) {
    return await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
