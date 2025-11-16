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

describe('SweetService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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

      (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [mockSweet] });

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
        quantity: 99,
        created_at: new Date(),
        updated_at: new Date(),
      };

      (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [mockSweet] });

      const result = await SweetService.purchaseSweet(1, 1);

      expect(result.quantity).toBe(99);
    });

    it('should throw error for insufficient quantity', async () => {
      (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [] });

      await expect(SweetService.purchaseSweet(1, 100)).rejects.toThrow(
        'Sweet not found or insufficient quantity'
      );
    });

    it('should throw error for non-positive quantity', async () => {
      await expect(SweetService.purchaseSweet(1, 0)).rejects.toThrow(
        'Purchase quantity must be positive'
      );
    });
  });

  describe('restockSweet', () => {
    it('should restock a sweet successfully', async () => {
      const mockSweet = {
        id: 1,
        name: 'Chocolate Bar',
        category: 'Chocolate',
        price: 2.50,
        quantity: 150,
        created_at: new Date(),
        updated_at: new Date(),
      };

      (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [mockSweet] });

      const result = await SweetService.restockSweet(1, 50);

      expect(result.quantity).toBe(150);
    });

    it('should throw error for non-positive quantity', async () => {
      await expect(SweetService.restockSweet(1, 0)).rejects.toThrow(
        'Restock quantity must be positive'
      );
    });
  });
});

