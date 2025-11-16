import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { validationResult } from 'express-validator';

export class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { email, password } = req.body;
      const result = await AuthService.register({ email, password });
      res.status(201).json(result);
    } catch (error: any) {
      console.error('Registration error:', error);
      
      if (error.message === 'User with this email already exists') {
        res.status(409).json({ error: error.message });
      } else if (error.code === '23505') {
        // PostgreSQL unique constraint violation
        res.status(409).json({ error: 'User with this email already exists' });
      } else if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
        res.status(500).json({ 
          error: 'Database connection failed',
          message: 'Please check your database configuration'
        });
      } else {
        // Log full error for debugging
        console.error('Full error details:', {
          message: error.message,
          stack: error.stack,
          code: error.code
        });
        res.status(500).json({ 
          error: 'Internal server error',
          message: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
      }
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { email, password } = req.body;
      const result = await AuthService.login({ email, password });
      res.status(200).json(result);
    } catch (error: any) {
      console.error('Login error:', error);
      
      if (error.message === 'Invalid email or password') {
        res.status(401).json({ error: error.message });
      } else if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
        res.status(500).json({ 
          error: 'Database connection failed',
          message: 'Please check your database configuration'
        });
      } else {
        console.error('Full error details:', {
          message: error.message,
          stack: error.stack,
          code: error.code
        });
        res.status(500).json({ 
          error: 'Internal server error',
          message: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
      }
    }
  }
}

