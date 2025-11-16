import request from 'supertest';
import app from '../../index';
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

describe('Auth Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password_hash: 'hashed_password',
        is_admin: false,
        created_at: new Date(),
      };

      (pool.query as jest.Mock)
        .mockResolvedValueOnce({ rows: [] })
        .mockResolvedValueOnce({ rows: [mockUser] });

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
      expect(response.body.user.email).toBe('test@example.com');
    });

    it('should return 400 for invalid email', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'invalid-email',
          password: 'password123',
        });

      expect(response.status).toBe(400);
    });

    it('should return 400 for short password', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: '12345',
        });

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password_hash: 'hashed_password',
        is_admin: false,
        created_at: new Date(),
      };

      (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [mockUser] });
      jest.spyOn(require('bcryptjs'), 'compare').mockResolvedValueOnce(true);

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });

    it('should return 401 for invalid credentials', async () => {
      (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [] });

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'wrong@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(401);
    });
  });
});

