import { jest } from "@jest/globals";
import { mockDeep } from "jest-mock-extended";
import bcrypt from "bcryptjs";

const prismaMock = mockDeep();

jest.unstable_mockModule("../../config/database.js", () => ({
  default: prismaMock,
  __esModule: true,
}));

// Dynamic imports
const { default: app } = await import("../../index.js");
const { default: request } = await import("supertest");

describe("Sweet Routes", () => {
  let authToken;
  let userId;

  const createTestUser = async () => {
    const mockUser = {
      id: 1,
      email: "test@example.com",
      password_hash: await bcrypt.hash("password123", 10),
      is_admin: false,
      created_at: new Date(),
    };

    prismaMock.user.findUnique.mockResolvedValue(null);
    prismaMock.user.create.mockResolvedValue(mockUser);

    const response = await request(app).post("/api/auth/register").send({
      email: "test@example.com",
      password: "password123",
    });

    authToken = response.body.token;
    userId = response.body.user.id;
  };

  beforeEach(async () => {
    await createTestUser();
  });

  describe("GET /api/sweets", () => {
    it("should return all sweets", async () => {
      const mockSweets = [
        {
          id: 1,
          name: "Gulab Jamun",
          category: "Milk Based",
          price: 10,
          quantity: 100,
        },
      ];
      prismaMock.sweet.findMany.mockResolvedValue(mockSweets);

      const response = await request(app)
        .get("/api/sweets")
        .set("Authorization", `Bearer ${authToken}`); // Needs auth

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body[0].name).toBe("Gulab Jamun");
    });
  });

  describe("POST /api/sweets/:id/purchase", () => {
    it("should purchase a sweet successfully", async () => {
      const mockSweet = {
        id: 1,
        name: "Gulab Jamun",
        category: "Milk Based",
        price: 10,
        quantity: 100,
      };

      const updatedSweet = { ...mockSweet, quantity: 99 };
      const mockPurchase = { id: 1, user_id: userId, sweet_id: 1, quantity: 1 };

      prismaMock.sweet.findUnique.mockResolvedValue(mockSweet);
      prismaMock.$transaction.mockImplementation(
        async (callback) => await callback(prismaMock),
      );
      prismaMock.sweet.update.mockResolvedValue(updatedSweet);
      prismaMock.purchase.create.mockResolvedValue(mockPurchase);

      const response = await request(app)
        .post("/api/sweets/1/purchase")
        .set("Authorization", `Bearer ${authToken}`)
        .send({ quantity: 1 });

      expect(response.status).toBe(200);
      expect(response.body.quantity).toBe(99);
    });

    it("should return 400 for insufficient quantity", async () => {
      const mockSweet = {
        id: 1,
        name: "Gulab Jamun",
        category: "Milk Based",
        price: 10,
        quantity: 5,
      };

      prismaMock.sweet.findUnique.mockResolvedValue(mockSweet);
      prismaMock.$transaction.mockImplementation(async (callback) => {
        throw new Error("Sweet not found or insufficient quantity");
      });

      const response = await request(app)
        .post("/api/sweets/1/purchase")
        .set("Authorization", `Bearer ${authToken}`)
        .send({ quantity: 10 });

      expect(response.status).toBe(400);
    });
  });
});
