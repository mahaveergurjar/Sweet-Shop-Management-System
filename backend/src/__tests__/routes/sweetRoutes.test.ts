import request from 'supertest';
import app from '../../index';
import pool from '../../config/database';
import { generateToken } from '../../utils/jwt';

jest.mock('../../config/database', () => {
  const mockPool = {
    query: jest.fn(),
  };
  return {
    __esModule: true,
    default: mockPool,
  };
});

describe('Sweet Routes', () => {
  let userToken: string;
  let adminToken: string;

  beforeEach(() => {
    jest.clearAllMocks();
    userToken = generateToken({ userId: 1, email: 'user@test.com', isAdmin: false });
    adminToken = generateToken({ userId: 2, email: 'admin@test.com', isAdmin: true });
  });

  describe('GET /api/sweets', () => {
    it('should get all sweets for authenticated user', async () => {
      const mockSweets = [
        {
          id: 1,
          name: 'Chocolate Bar',
          category: 'Chocolate',
          price: 2.50,
          quantity: 100,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      (pool.query as jest.Mock).mockResolvedValueOnce({ rows: mockSweets });

      const response = await request(app)
        .get('/api/sweets')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should return 401 without authentication', async () => {
      const response = await request(app).get('/api/sweets');

      expect(response.status).toBe(401);
    });
  });

  describe('POST /api/sweets', () => {
    it('should create sweet as admin', async () => {
      const mockSweet = {
        id: 1,
        name: 'New Sweet',
        category: 'Candy',
        price: 1.50,
        quantity: 50,
        created_at: new Date(),
        updated_at: new Date(),
      };

      (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [mockSweet] });

      const response = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'New Sweet',
          category: 'Candy',
          price: 1.50,
          quantity: 50,
        });

      expect(response.status).toBe(201);
      expect(response.body.name).toBe('New Sweet');
    });

    it('should return 403 for non-admin user', async () => {
      const response = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'New Sweet',
          category: 'Candy',
          price: 1.50,
          quantity: 50,
        });

      expect(response.status).toBe(403);
    });
  });

  describe('POST /api/sweets/:id/purchase', () => {
    it('should purchase a sweet', async () => {
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

      const response = await request(app)
        .post('/api/sweets/1/purchase')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ quantity: 1 });

      expect(response.status).toBe(200);
      expect(response.body.quantity).toBe(99);
    });
  });
});

