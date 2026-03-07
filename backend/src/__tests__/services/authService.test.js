import { jest } from "@jest/globals";
import { mockDeep } from "jest-mock-extended";
import bcrypt from "bcryptjs";

const prismaMock = mockDeep();

jest.unstable_mockModule("../../config/database.js", () => ({
  default: prismaMock,
  __esModule: true,
}));

// Dynamic imports
const { AuthService } = await import("../../services/authService.js");

describe("AuthService", () => {
  describe("register", () => {
    it("should register a new user successfully", async () => {
      const mockUser = {
        id: 1,
        email: "test@example.com",
        password_hash: "hashed_password",
        is_admin: false,
        created_at: new Date(),
      };

      prismaMock.user.findUnique.mockResolvedValue(null);
      prismaMock.user.create.mockResolvedValue(mockUser);

      // Pass object as argument
      const result = await AuthService.register({
        email: "test@example.com",
        password: "password123",
      });

      expect(result.user.email).toBe("test@example.com");
      expect(result).toHaveProperty("token");
    });

    it("should throw error if user already exists", async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: 1,
        email: "test@example.com",
      });

      await expect(
        AuthService.register({
          email: "test@example.com",
          password: "password123",
        }),
      ).rejects.toThrow("User with this email already exists");
    });
  });

  describe("login", () => {
    it("should login successfully with valid credentials", async () => {
      const password = "password123";
      const hashedPassword = await bcrypt.hash(password, 10);
      const mockUser = {
        id: 1,
        email: "test@example.com",
        password_hash: hashedPassword,
        is_admin: false,
        created_at: new Date(),
      };

      prismaMock.user.findUnique.mockResolvedValue(mockUser);

      // Pass object as argument
      const result = await AuthService.login({
        email: "test@example.com",
        password: password,
      });

      expect(result.user.email).toBe("test@example.com");
      expect(result).toHaveProperty("token");
    });

    it("should throw error for invalid credentials", async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      await expect(
        AuthService.login({
          email: "wrong@example.com",
          password: "password123",
        }),
      ).rejects.toThrow("Invalid email or password");
    });
  });
});
