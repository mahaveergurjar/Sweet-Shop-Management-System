const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const prisma = new PrismaClient();

const demoData = [
  { name: "Chocolate Bar", category: "Chocolate", price: 25.0, quantity: 100 },
  { name: "Gummy Bears", category: "Candy", price: 18.0, quantity: 150 },
  { name: "Lollipop", category: "Candy", price: 8.0, quantity: 200 },
  { name: "Caramel Toffee", category: "Toffee", price: 22.0, quantity: 80 },
  { name: "Mint Chocolate", category: "Chocolate", price: 28.0, quantity: 120 },
  { name: "Jelly Beans", category: "Candy", price: 18.0, quantity: 180 },
  { name: "Dark Chocolate", category: "Chocolate", price: 45.0, quantity: 90 },
  { name: "Cotton Candy", category: "Candy", price: 25.0, quantity: 60 },
  { name: "Fudge Brownie", category: "Bakery", price: 55.0, quantity: 50 },
  { name: "Sour Patch Kids", category: "Candy", price: 28.0, quantity: 130 },
  {
    name: "White Chocolate",
    category: "Chocolate",
    price: 32.0,
    quantity: 110,
  },
  { name: "Rock Candy", category: "Candy", price: 12.0, quantity: 140 },
  { name: "Truffles", category: "Chocolate", price: 90.0, quantity: 40 },
  { name: "Licorice", category: "Candy", price: 18.0, quantity: 100 },
  { name: "Peppermint Candy", category: "Candy", price: 8.0, quantity: 250 },
  {
    name: "Chocolate Chip Cookie",
    category: "Bakery",
    price: 35.0,
    quantity: 70,
  },
  { name: "Marshmallows", category: "Candy", price: 22.0, quantity: 160 },
  { name: "Fruit Gummies", category: "Candy", price: 22.0, quantity: 120 },
  { name: "Honeycomb", category: "Toffee", price: 35.0, quantity: 55 },
  {
    name: "Chocolate Covered Nuts",
    category: "Chocolate",
    price: 70.0,
    quantity: 65,
  },
];

async function addDemoData() {
  try {
    console.log("🍬 Adding demo sweets data...\n");

    // Check if data already exists
    const existingCount = await prisma.sweet.count();

    if (existingCount > 0) {
      console.log(`⚠️  Database already contains ${existingCount} sweets.`);
      console.log("Skipping demo data insertion to avoid duplicates.\n");
      console.log(
        "If you want to add demo data anyway, clear the sweets table first.",
      );
      await prisma.$disconnect();
      return;
    }

    // Insert demo data
    for (const sweet of demoData) {
      await prisma.sweet.create({ data: sweet });
      console.log(
        `✅ Added: ${sweet.name} (${sweet.category}) - ₹${sweet.price.toFixed(2)}`,
      );
    }

    console.log(
      `\n✅ Successfully added ${demoData.length} sweets to the database!`,
    );
    console.log(
      "You can now view them in the application at http://localhost:3000\n",
    );
  } catch (error) {
    console.error("❌ Error adding demo data:", error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

addDemoData();
