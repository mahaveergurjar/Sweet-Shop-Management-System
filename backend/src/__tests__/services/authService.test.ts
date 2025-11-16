import { AuthService } from '../../services/authService';
import { UserModel } from '../../models/User';
import pool from '../../config/database';

// Mock the database pool for tests
jest.mock('../../config/database', () => {
  const mockPool = {
    query: jest.fn(),
  };
  return {
    __esModule: true,
    default: mockPool,
  };
});

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password_hash: 'hashed_password',
        is_admin: false,
        created_at: new Date(),
      };

      (pool.query as jest.Mock)
        .mockResolvedValueOnce({ rows: [] }) // Check existing user
        .mockResolvedValueOnce({ rows: [mockUser] }); // Create user

      const result = await AuthService.register({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result).toHaveProperty('token');
      expect(result.user.email).toBe('test@example.com');
      expect(result.user.isAdmin).toBe(false);
    });

    it('should throw error if user already exists', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password_hash: 'hashed_password',
        is_admin: false,
        created_at: new Date(),
      };

      (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [mockUser] });

      await expect(
        AuthService.register({
          email: 'test@example.com',
          password: 'password123',
        })
      ).rejects.toThrow('User with this email already exists');
    });
  });

  describe('login', () => {
    it('should login user with valid credentials', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password_hash: 'hashed_password',
        is_admin: false,
        created_at: new Date(),
      };

      (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [mockUser] });
      
      // Mock bcrypt compare
      jest.spyOn(require('bcryptjs'), 'compare').mockResolvedValueOnce(true);

      const result = await AuthService.login({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result).toHaveProperty('token');
      expect(result.user.email).toBe('test@example.com');
    });

    it('should throw error with invalid email', async () => {
      (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [] });

      await expect(
        AuthService.login({
          email: 'wrong@example.com',
          password: 'password123',
        })
      ).rejects.toThrow('Invalid email or password');
    });

    it('should throw error with invalid password', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password_hash: 'hashed_password',
        is_admin: false,
        created_at: new Date(),
      };

      (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [mockUser] });
      jest.spyOn(require('bcryptjs'), 'compare').mockResolvedValueOnce(false);

      await expect(
        AuthService.login({
          email: 'test@example.com',
          password: 'wrongpassword',
        })
      ).rejects.toThrow('Invalid email or password');
    });
  });
});

