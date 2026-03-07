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
        "https://images.unsplash.com/photo-1605197148970-d9da1b6fc2be?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "Rasgulla",
      category: "Dessert",
      price: 180.0,
      quantity: 40,
      unit: "kg",
      image_url:
        "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "Kaju Katli",
      category: "Premium",
      price: 800.0,
      quantity: 20,
      unit: "kg",
      image_url:
        "https://images.unsplash.com/photo-1631505971150-a8d297ff04e9?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "Motichoor Ladoo",
      category: "Ladoo",
      price: 250.0,
      quantity: 30,
      unit: "kg",
      image_url:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "Besan Ladoo",
      category: "Ladoo",
      price: 300.0,
      quantity: 25,
      unit: "kg",
      image_url:
        "https://images.unsplash.com/photo-1615486511484-92e172fc4e0c?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "Jalebi",
      category: "Snack",
      price: 150.0,
      quantity: 30,
      unit: "kg",
      image_url:
        "https://images.unsplash.com/photo-1589116891005-7243c3d5a767?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "Rasmalai",
      category: "Premium Dessert",
      price: 40.0,
      quantity: 120,
      unit: "piece",
      image_url:
        "https://images.unsplash.com/photo-1627308595229-7830f5c92c90?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "Mysore Pak",
      category: "South Indian",
      price: 450.0,
      quantity: 20,
      unit: "kg",
      image_url:
        "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "Soan Papdi",
      category: "Boxed",
      price: 150.0,
      quantity: 80,
      unit: "box",
      image_url:
        "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "Ghevar",
      category: "Seasonal",
      price: 250.0,
      quantity: 40,
      unit: "piece",
      image_url:
        "https://images.unsplash.com/photo-1621275990520-fe14ea7d8bba?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "Peda",
      category: "Milk Sweet",
      price: 350.0,
      quantity: 30,
      unit: "kg",
      image_url:
        "https://images.unsplash.com/photo-1585848245785-5b48ec42557e?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "Milk Cake",
      category: "Milk Sweet",
      price: 400.0,
      quantity: 25,
      unit: "kg",
      image_url:
        "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "Barfi",
      category: "Milk Sweet",
      price: 300.0,
      quantity: 50,
      unit: "kg",
      image_url:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "Kalakand",
      category: "Premium Dessert",
      price: 450.0,
      quantity: 15,
      unit: "kg",
      image_url:
        "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "Petha",
      category: "Dry Sweet",
      price: 100.0,
      quantity: 60,
      unit: "kg",
      image_url:
        "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "Cham Cham",
      category: "Dessert",
      price: 220.0,
      quantity: 20,
      unit: "kg",
      image_url:
        "https://images.unsplash.com/photo-1627308595229-7830f5c92c90?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "Sandesh",
      category: "Bengali",
      price: 25.0,
      quantity: 160,
      unit: "piece",
      image_url:
        "https://images.unsplash.com/photo-1589116891005-7243c3d5a767?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "Gujiya",
      category: "Festive",
      price: 300.0,
      quantity: 20,
      unit: "kg",
      image_url:
        "https://images.unsplash.com/photo-1615486511484-92e172fc4e0c?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "Shrikhand",
      category: "Dessert",
      price: 180.0,
      quantity: 40,
      unit: "box",
      image_url:
        "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "Imarti",
      category: "Snack",
      price: 250.0,
      quantity: 25,
      unit: "kg",
      image_url:
        "https://images.unsplash.com/photo-1589116891005-7243c3d5a767?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "Boondi Ladoo",
      category: "Ladoo",
      price: 220.0,
      quantity: 40,
      unit: "kg",
      image_url:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "Badam Halwa",
      category: "Premium",
      price: 900.0,
      quantity: 10,
      unit: "kg",
      image_url:
        "https://images.unsplash.com/photo-1605197148970-d9da1b6fc2be?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "Dodha Barfi",
      category: "Milk Sweet",
      price: 450.0,
      quantity: 15,
      unit: "kg",
      image_url:
        "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "Malpua",
      category: "Dessert",
      price: 30.0,
      quantity: 80,
      unit: "piece",
      image_url:
        "https://images.unsplash.com/photo-1621275990520-fe14ea7d8bba?auto=format&fit=crop&q=80&w=600",
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
