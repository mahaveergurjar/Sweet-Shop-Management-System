import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prismaOptions = {
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "info", "warn", "error"]
      : ["error"],
};

const prisma = new PrismaClient(prismaOptions);

// Test database connection on startup
async function testConnection() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("✅ Database connected successfully via Prisma");
  } catch (err) {
    console.error("❌ Database connection test failed:", err.message);
  }
}

// Only run test if not in test environment
if (process.env.NODE_ENV !== "test") {
  testConnection();
}

export default prisma;
