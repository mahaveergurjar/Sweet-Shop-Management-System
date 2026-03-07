import { UserModel } from '../models/User.js';
import { generateToken } from '../utils/jwt.js';
export class AuthService {
  static async register(input) {
    // Check if user already exists
    const existingUser = await UserModel.findByEmail(input.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create new user
    const user = await UserModel.create({
      email: input.email,
      password: input.password,
      isAdmin: false
    });

    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      isAdmin: user.is_admin
    });
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        isAdmin: user.is_admin
      }
    };
  }
  static async login(input) {
    // Find user by email
    const user = await UserModel.findByEmail(input.email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Verify password
    const isValidPassword = await UserModel.verifyPassword(input.password, user.password_hash);
    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      isAdmin: user.is_admin
    });
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        isAdmin: user.is_admin
      }
    };
  }
}