import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const isTest = process.env.NODE_ENV === "test";
const databaseUrl =
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5432/sweet_shop_db";

const prismaOptions = {
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "info", "warn", "error"]
      : ["error"],
};

// Prisma v7 and engine/adapter logic
if (databaseUrl.startsWith("prisma+postgres://")) {
  console.log("ℹ️ Using Prisma Postgres (Accelerate) connection");
  prismaOptions.accelerateUrl = databaseUrl;
} else {
  console.log("ℹ️ Using PrismaPg driver adapter");
  // Strip query params to avoid conflicts with manual SSL config
  const connectionString = databaseUrl.split("?")[0];
  const pool = new pg.Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  const adapter = new PrismaPg(pool);
  prismaOptions.adapter = adapter;
}

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
