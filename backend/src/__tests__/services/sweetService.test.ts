import { SweetService } from '../../services/sweetService';
import { SweetModel } from '../../models/Sweet';
import pool from '../../config/database';

jest.mock('../../config/database', () => {
  const mockPool = {
    query: jest.fn(),
  };
  return {
    __esModule: true,
    default: mockPool,
  };
});

// Cast the mocked pool to its mocked type for TypeScript
const mockedPool = pool as jest.Mocked<typeof pool>;

describe('SweetService', () => {
  // Define a mock user ID to pass to the function
  const mockUserId = 1;

  beforeEach(() => {
    jest.clearAllMocks();
    (mockedPool.query as jest.Mock).mockClear();
  });

  describe('createSweet', () => {
    it('should create a sweet successfully', async () => {
      const mockSweet = {
        id: 1,
        name: 'Chocolate Bar',
        category: 'Chocolate',
        price: 2.50,
        quantity: 100,
        created_at: new Date(),
        updated_at: new Date(),
      };

      (mockedPool.query as jest.Mock).mockResolvedValueOnce({ rows: [mockSweet] });

      const result = await SweetService.createSweet({
        name: 'Chocolate Bar',
        category: 'Chocolate',
        price: 2.50,
        quantity: 100,
      });

      expect(result.name).toBe('Chocolate Bar');
      expect(result.price).toBe(2.50);
    });

    it('should throw error for negative price', async () => {
      await expect(
        SweetService.createSweet({
          name: 'Chocolate Bar',
          category: 'Chocolate',
          price: -1,
          quantity: 100,
        })
      ).rejects.toThrow('Price cannot be negative');
    });

    it('should throw error for negative quantity', async () => {
      await expect(
        SweetService.createSweet({
          name: 'Chocolate Bar',
          category: 'Chocolate',
          price: 2.50,
          quantity: -1,
        })
      ).rejects.toThrow('Quantity cannot be negative');
    });
  });

  describe('purchaseSweet', () => {
    it('should purchase a sweet successfully', async () => {
      const mockSweet = {
        id: 1,
        name: 'Chocolate Bar',
        category: 'Chocolate',
        price: 2.50,
        quantity: 100, // Original quantity
      };
      
      const updatedSweet = { ...mockSweet, quantity: 99 }; // Updated quantity
      
      const mockPurchaseRecord = {
        id: 1,
        user_id: mockUserId,
        sweet_id: 1,
        quantity: 1,
        total_price: 2.50,
      };

      // Mock 1: For finding the sweet (SELECT)
      (mockedPool.query as jest.Mock).mockResolvedValueOnce({ rows: [mockSweet] });
      
      // Mock 2: For updating the sweet's quantity (UPDATE from SweetModel.purchase)
      (mockedPool.query as jest.Mock).mockResolvedValueOnce({ rows: [updatedSweet] });
      
      // Mock 3: For creating the purchase record (INSERT from PurchaseModel.create)
      (mockedPool.query as jest.Mock).mockResolvedValueOnce({ rows: [mockPurchaseRecord] });

      const result = await SweetService.purchaseSweet(1, 1, mockUserId);

      // (Assuming your service returns the *updated sweet*, not the purchase record)
      expect(result).toEqual(updatedSweet);
      expect(result.quantity).toBe(99);
    });

    it('should throw error for insufficient quantity', async () => {
      // Mock sweet with insufficient quantity
      const mockSweet = {
        id: 1,
        name: 'Test Sweet',
        category: 'Test',
        price: 10.0,
        quantity: 10, // Only 10 available
        created_at: new Date(),
        updated_at: new Date(),
      };
      
      // Mock 1: findById call - returns sweet with quantity 10
      (mockedPool.query as jest.Mock).mockResolvedValueOnce({ rows: [mockSweet] });
      
      // Mock 2: purchase call - returns empty rows (UPDATE didn't match because quantity < requested)
      (mockedPool.query as jest.Mock).mockResolvedValueOnce({ rows: [] });

      // Trying to buy 100 when only 10 available
      await expect(
        SweetService.purchaseSweet(1, 100, mockUserId)
      ).rejects.toThrow('Sweet not found or insufficient quantity');
    });

    it('should throw error for non-positive quantity', async () => {
      await expect(SweetService.purchaseSweet(1, 0, mockUserId)).rejects.toThrow(
        'Purchase quantity must be positive'
      );
    });
  });

  describe('restockSweet', () => {
    it('should restock a sweet successfully', async () => {
      const originalSweet = {
        id: 1,
        name: 'Chocolate Bar',
        category: 'Chocolate',
        price: 2.50,
        quantity: 100,
        created_at: new Date(),
        updated_at: new Date(),
      };
      
      const restockedSweet = {
        ...originalSweet,
        quantity: 150, // After adding 50
      };

      // Mock the restock query (UPDATE that adds quantity)
      (mockedPool.query as jest.Mock).mockResolvedValueOnce({ rows: [restockedSweet] });

      const result = await SweetService.restockSweet(1, 50);

      expect(result.quantity).toBe(150);
      expect(mockedPool.query).toHaveBeenCalledTimes(1);
    });

    it('should throw error for non-positive quantity', async () => {
      await expect(SweetService.restockSweet(1, 0)).rejects.toThrow(
        'Restock quantity must be positive'
      );
    });
  });
});