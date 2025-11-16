import request from 'supertest';
import app from '../../index';
import pool from '../../config/database';

// Mock the database pool
jest.mock('../../config/database', () => {
  const mockPool = {
    query: jest.fn(),
  };
  return {
    __esModule: true,
    default: mockPool,
  };
});

const mockedPool = pool as jest.Mocked<typeof pool>;

describe('Sweet Routes', () => {
  let authToken: string;
  let userId: number;

  beforeEach(() => {
    jest.clearAllMocks();
    (mockedPool.query as jest.Mock).mockClear();
  });

  // Helper to create a test user and get token
  const createTestUser = async () => {
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      password_hash: '$2a$10$hashed',
      is_admin: false,
      created_at: new Date(),
    };

    (mockedPool.query as jest.Mock)
      .mockResolvedValueOnce({ rows: [] }) // Check if user exists
      .mockResolvedValueOnce({ rows: [mockUser] }); // Create user

    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });

    authToken = response.body.token;
    userId = response.body.user.id;
  };

  describe('POST /api/sweets/:id/purchase', () => {
    it('should successfully purchase a sweet', async () => {
      await createTestUser();

      const mockSweet = {
        id: 1,
        name: 'Chocolate Bar',
        category: 'Chocolate',
        price: '2.50', // Database returns as string
        quantity: 10,
        created_at: new Date(),
        updated_at: new Date(),
      };

      const updatedSweet = { ...mockSweet, quantity: 9, price: '2.50' };
      const mockPurchaseRecord = {
        id: 1,
        user_id: userId,
        sweet_id: 1,
        quantity: 1,
        price_per_unit: '2.50',
        total_price: '2.50',
        sweet_name: 'Chocolate Bar',
        sweet_category: 'Chocolate',
        created_at: new Date(),
      };

      // Mock queries: 
      // 1. getSweetById (controller calls this first) - findById
      // 2. purchaseSweet service: findById (first call in service)
      // 3. purchaseSweet service: purchase (UPDATE query)
      // 4. purchaseSweet service: create purchase record (INSERT)
      (mockedPool.query as jest.Mock)
        .mockResolvedValueOnce({ rows: [mockSweet] }) // getSweetById in controller
        .mockResolvedValueOnce({ rows: [mockSweet] }) // findById in purchaseSweet service
        .mockResolvedValueOnce({ rows: [updatedSweet] }) // purchase UPDATE
        .mockResolvedValueOnce({ rows: [mockPurchaseRecord] }); // create purchase

      const response = await request(app)
        .post('/api/sweets/1/purchase')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ quantity: 1 });

      if (response.status !== 200) {
        console.error('Response error:', response.body);
      }
      expect(response.status).toBe(200);
      expect(response.body.quantity).toBe(9);
    });

    it('should throw error for insufficient quantity', async () => {
      await createTestUser();

      const mockSweet = {
        id: 1,
        name: 'Test Sweet',
        category: 'Test',
        price: 5,
        quantity: 10,
        created_at: new Date(),
        updated_at: new Date(),
      };

      // Mock: findById returns sweet, purchase returns empty (insufficient)
      (mockedPool.query as jest.Mock)
        .mockResolvedValueOnce({ rows: [mockSweet] })
        .mockResolvedValueOnce({ rows: [] });

      const response = await request(app)
        .post('/api/sweets/1/purchase')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ quantity: 100 });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('insufficient');
    });

    it('should return 401 without authentication', async () => {
      const response = await request(app)
        .post('/api/sweets/1/purchase')
        .send({ quantity: 1 });

      expect(response.status).toBe(401);
    });
  });
});