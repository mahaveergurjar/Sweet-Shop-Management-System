import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data to prevent unique constraint errors during seed
  await prisma.purchase.deleteMany({});
  await prisma.sweet.deleteMany({});
  await prisma.user.deleteMany({});

  // 1. Create Admin User
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.create({
    data: {
      email: "admin@sweetshop.com",
      password_hash: adminPassword,
      is_admin: true,
    },
  });

  // 2. Create Regular User
  const userPassword = await bcrypt.hash("user123", 10);
  const user = await prisma.user.create({
    data: {
      email: "user@example.com",
      password_hash: userPassword,
      is_admin: false,
    },
  });

  // 3. Insert Sweets Catalog with Weight/Units and Images
  const sweetsData = [
    {
      name: "Gulab Jamun",
      category: "Dessert",
      price: 200.0,
      quantity: 50,
      unit: "kg",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Gulab_jamun_%28Gibraltar%29.jpg/640px-Gulab_jamun_%28Gibraltar%29.jpg",
    },
    {
      name: "Rasgulla",
      category: "Dessert",
      price: 180.0,
      quantity: 40,
      unit: "kg",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Rasgulla.jpg/640px-Rasgulla.jpg",
    },
    {
      name: "Kaju Katli",
      category: "Premium",
      price: 800.0,
      quantity: 20,
      unit: "kg",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Kaju_Katli_-_Indian_Sweet.jpg/640px-Kaju_Katli_-_Indian_Sweet.jpg",
    },
    {
      name: "Motichoor Ladoo",
      category: "Ladoo",
      price: 250.0,
      quantity: 30,
      unit: "kg",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Motichoor_Laddu.jpg/640px-Motichoor_Laddu.jpg",
    },
    {
      name: "Besan Ladoo",
      category: "Ladoo",
      price: 300.0,
      quantity: 25,
      unit: "kg",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Laddu_of_Besan.jpg/640px-Laddu_of_Besan.jpg",
    },
    {
      name: "Jalebi",
      category: "Snack",
      price: 150.0,
      quantity: 30,
      unit: "kg",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Jalebi.jpg/640px-Jalebi.jpg",
    },
    {
      name: "Rasmalai",
      category: "Premium Dessert",
      price: 40.0,
      quantity: 120,
      unit: "piece",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Ras_Malai.jpg/640px-Ras_Malai.jpg",
    },
    {
      name: "Mysore Pak",
      category: "South Indian",
      price: 450.0,
      quantity: 20,
      unit: "kg",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Mysore_pak.jpg/640px-Mysore_pak.jpg",
    },
    {
      name: "Soan Papdi",
      category: "Boxed",
      price: 150.0,
      quantity: 80,
      unit: "box",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Soan_Papdi_3.jpg/640px-Soan_Papdi_3.jpg",
    },
    {
      name: "Ghevar",
      category: "Seasonal",
      price: 250.0,
      quantity: 40,
      unit: "piece",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Ghevar_01.jpg/640px-Ghevar_01.jpg",
    },
    {
      name: "Peda",
      category: "Milk Sweet",
      price: 350.0,
      quantity: 30,
      unit: "kg",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Peda_%28Indian_Sweet%29.jpg/640px-Peda_%28Indian_Sweet%29.jpg",
    },
    {
      name: "Milk Cake",
      category: "Milk Sweet",
      price: 400.0,
      quantity: 25,
      unit: "kg",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Milk_Cake.jpg/640px-Milk_Cake.jpg",
    },
    {
      name: "Barfi",
      category: "Milk Sweet",
      price: 300.0,
      quantity: 50,
      unit: "kg",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Barfi_sweet.jpg/640px-Barfi_sweet.jpg",
    },
    {
      name: "Kalakand",
      category: "Premium Dessert",
      price: 450.0,
      quantity: 15,
      unit: "kg",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Kalakand_1.jpg/640px-Kalakand_1.jpg",
    },
    {
      name: "Petha",
      category: "Dry Sweet",
      price: 100.0,
      quantity: 60,
      unit: "kg",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Agra_Petha.jpg/640px-Agra_Petha.jpg",
    },
    {
      name: "Cham Cham",
      category: "Dessert",
      price: 220.0,
      quantity: 20,
      unit: "kg",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Cham_Cham.jpg/640px-Cham_Cham.jpg",
    },
    {
      name: "Sandesh",
      category: "Bengali",
      price: 25.0,
      quantity: 160,
      unit: "piece",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Sandesh_sweet.JPG/640px-Sandesh_sweet.JPG",
    },
    {
      name: "Gujiya",
      category: "Festive",
      price: 300.0,
      quantity: 20,
      unit: "kg",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Gujiya_plate.jpg/640px-Gujiya_plate.jpg",
    },
    {
      name: "Shrikhand",
      category: "Dessert",
      price: 180.0,
      quantity: 40,
      unit: "box",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Shrikhand.jpg/640px-Shrikhand.jpg",
    },
    {
      name: "Imarti",
      category: "Snack",
      price: 250.0,
      quantity: 25,
      unit: "kg",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Imarti_Sweet.jpg/640px-Imarti_Sweet.jpg",
    },
    {
      name: "Boondi Ladoo",
      category: "Ladoo",
      price: 220.0,
      quantity: 40,
      unit: "kg",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Boondi_ladoo.jpg/640px-Boondi_ladoo.jpg",
    },
    {
      name: "Badam Halwa",
      category: "Premium",
      price: 900.0,
      quantity: 10,
      unit: "kg",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Badam_Halwa.JPG/640px-Badam_Halwa.JPG",
    },
    {
      name: "Dodha Barfi",
      category: "Milk Sweet",
      price: 450.0,
      quantity: 15,
      unit: "kg",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Dodha_Barfi.jpg/640px-Dodha_Barfi.jpg",
    },
    {
      name: "Malpua",
      category: "Dessert",
      price: 30.0,
      quantity: 80,
      unit: "piece",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Malpua.JPG/640px-Malpua.JPG",
    },
  ];

  await prisma.sweet.createMany({
    data: sweetsData,
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
