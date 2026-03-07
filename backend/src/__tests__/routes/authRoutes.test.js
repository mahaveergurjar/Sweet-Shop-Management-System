import { jest } from "@jest/globals";
import { mockDeep } from "jest-mock-extended";

// Create the mock
const prismaMock = mockDeep();

// Establish mock BEFORE importing anything that uses the database
jest.unstable_mockModule("../../config/database.js", () => ({
  default: prismaMock,
  __esModule: true,
}));

// Dynamic imports to ensure they happen after mocking
const { default: app } = await import("../../index.js");
const { default: request } = await import("supertest");
const { default: bcrypt } = await import("bcryptjs");

describe("Auth Routes", () => {
  describe("POST /api/auth/register", () => {
    it("should register a new user", async () => {
      const mockUser = {
        id: 1,
        email: "test@example.com",
        password_hash: "hashed_password",
        is_admin: false,
        created_at: new Date(),
      };

      prismaMock.user.findUnique.mockResolvedValue(null);
      prismaMock.user.create.mockResolvedValue(mockUser);

      const response = await request(app).post("/api/auth/register").send({
        email: "test@example.com",
        password: "password123",
      });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("token");
      expect(response.body.user.email).toBe("test@example.com");
    });

    it("should return 400 for invalid email", async () => {
      const response = await request(app).post("/api/auth/register").send({
        email: "invalid-email",
        password: "password123",
      });

      expect(response.status).toBe(400);
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login with valid credentials", async () => {
      const mockUser = {
        id: 1,
        email: "test@example.com",
        password_hash: await bcrypt.hash("password123", 10),
        is_admin: false,
        created_at: new Date(),
      };

      prismaMock.user.findUnique.mockResolvedValue(mockUser);

      const response = await request(app).post("/api/auth/login").send({
        email: "test@example.com",
        password: "password123",
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
    });

    it("should return 401 for invalid credentials", async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      const response = await request(app).post("/api/auth/login").send({
        email: "wrong@example.com",
        password: "password123",
      });

      expect(response.status).toBe(401);
    });
  });
});
