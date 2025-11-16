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
      if (error.message === 'User with this email already exists') {
        res.status(409).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
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
      if (error.message === 'Invalid email or password') {
        res.status(401).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
}

