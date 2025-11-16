import { UserModel, CreateUserInput } from '../models/User';
import { generateToken } from '../utils/jwt';

export interface RegisterInput {
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResult {
  token: string;
  user: {
    id: number;
    email: string;
    isAdmin: boolean;
  };
}

export class AuthService {
  static async register(input: RegisterInput): Promise<AuthResult> {
    // Check if user already exists
    const existingUser = await UserModel.findByEmail(input.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create new user
    const user = await UserModel.create({
      email: input.email,
      password: input.password,
      isAdmin: false,
    });

    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      isAdmin: user.is_admin,
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        isAdmin: user.is_admin,
      },
    };
  }

  static async login(input: LoginInput): Promise<AuthResult> {
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
      isAdmin: user.is_admin,
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        isAdmin: user.is_admin,
      },
    };
  }
}

