import { jest } from "@jest/globals";
import { mockDeep } from "jest-mock-extended";

const prismaMock = mockDeep();

jest.unstable_mockModule("../../config/database.js", () => ({
  default: prismaMock,
  __esModule: true,
}));

// Dynamic imports
const { SweetService } = await import("../../services/sweetService.js");

describe("SweetService", () => {
  const mockUserId = 1;

  describe("createSweet", () => {
    it("should create a sweet successfully", async () => {
      const mockSweet = {
        id: 1,
        name: "Chocolate Bar",
        category: "Chocolate",
        price: 2.5,
        quantity: 100,
        created_at: new Date(),
        updated_at: new Date(),
      };

      prismaMock.sweet.create.mockResolvedValue(mockSweet);

      const result = await SweetService.createSweet({
        name: "Chocolate Bar",
        category: "Chocolate",
        price: 2.5,
        quantity: 100,
      });

      expect(result.name).toBe("Chocolate Bar");
      expect(result.price).toBe(2.5);
    });

    it("should throw error for negative price", async () => {
      await expect(
        SweetService.createSweet({
          name: "Chocolate Bar",
          category: "Chocolate",
          price: -1,
          quantity: 100,
        }),
      ).rejects.toThrow("Price cannot be negative");
    });
  });

  describe("purchaseSweet", () => {
    it("should purchase a sweet successfully", async () => {
      const mockSweet = {
        id: 1,
        name: "Chocolate Bar",
        category: "Chocolate",
        price: 2.5,
        quantity: 100,
      };

      const updatedSweet = { ...mockSweet, quantity: 99 };
      const mockPurchaseRecord = {
        id: 1,
        user_id: mockUserId,
        sweet_id: 1,
        quantity: 1,
        price_per_unit: 2.5,
        total_price: 2.5,
        sweet_name: "Chocolate Bar",
        sweet_category: "Chocolate",
      };

      prismaMock.sweet.findUnique.mockResolvedValue(mockSweet);
      prismaMock.$transaction.mockImplementation(
        async (callback) => await callback(prismaMock),
      );
      prismaMock.sweet.update.mockResolvedValue(updatedSweet);
      prismaMock.purchase.create.mockResolvedValue(mockPurchaseRecord);

      const result = await SweetService.purchaseSweet(1, 1, mockUserId);

      expect(result).toEqual(updatedSweet);
      expect(result.quantity).toBe(99);
    });

    it("should throw error for insufficient quantity", async () => {
      const mockSweet = {
        id: 1,
        name: "Test Sweet",
        category: "Test",
        price: 10.0,
        quantity: 10,
      };

      prismaMock.sweet.findUnique.mockResolvedValue(mockSweet);
      prismaMock.$transaction.mockImplementation(async (callback) => {
        throw new Error("Sweet not found or insufficient quantity");
      });

      await expect(
        SweetService.purchaseSweet(1, 100, mockUserId),
      ).rejects.toThrow("Sweet not found or insufficient quantity");
    });
  });

  describe("restockSweet", () => {
    it("should restock a sweet successfully", async () => {
      const restockedSweet = {
        id: 1,
        name: "Chocolate Bar",
        category: "Chocolate",
        price: 2.5,
        quantity: 150,
      };

      prismaMock.sweet.update.mockResolvedValue(restockedSweet);

      const result = await SweetService.restockSweet(1, 50);
      expect(result.quantity).toBe(150);
    });
  });
});
