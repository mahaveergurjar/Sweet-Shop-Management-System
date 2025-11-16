import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { SweetService } from '../services/sweetService';
import { validationResult } from 'express-validator';

export class SweetController {
  static async createSweet(req: AuthRequest, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { name, category, price, quantity } = req.body;
      const sweet = await SweetService.createSweet({ name, category, price, quantity });
      res.status(201).json(sweet);
    } catch (error: any) {
      if (error.message.includes('cannot be negative')) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  static async getAllSweets(req: AuthRequest, res: Response): Promise<void> {
    try {
      const sweets = await SweetService.getAllSweets();
      res.status(200).json(sweets);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async searchSweets(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { name, category, minPrice, maxPrice } = req.query;
      const filters = {
        name: name as string | undefined,
        category: category as string | undefined,
        minPrice: minPrice ? parseFloat(minPrice as string) : undefined,
        maxPrice: maxPrice ? parseFloat(maxPrice as string) : undefined,
      };
      const sweets = await SweetService.searchSweets(filters);
      res.status(200).json(sweets);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getSweetById(req: AuthRequest, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const sweet = await SweetService.getSweetById(id);
      res.status(200).json(sweet);
    } catch (error: any) {
      if (error.message === 'Sweet not found') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  static async updateSweet(req: AuthRequest, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const id = parseInt(req.params.id);
      const { name, category, price, quantity } = req.body;
      const sweet = await SweetService.updateSweet(id, { name, category, price, quantity });
      res.status(200).json(sweet);
    } catch (error: any) {
      if (error.message === 'Sweet not found') {
        res.status(404).json({ error: error.message });
      } else if (error.message.includes('cannot be negative')) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  static async deleteSweet(req: AuthRequest, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const result = await SweetService.deleteSweet(id);
      res.status(200).json(result);
    } catch (error: any) {
      if (error.message === 'Sweet not found') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  static async purchaseSweet(req: AuthRequest, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const id = parseInt(req.params.id);
      const quantity = req.body.quantity || 1;
      const userId = req.user!.userId;
      
      // Get sweet details before purchase
      const sweetBeforePurchase = await SweetService.getSweetById(id);
      if (!sweetBeforePurchase) {
        res.status(404).json({ error: 'Sweet not found' });
        return;
      }

      // Perform purchase
      const sweet = await SweetService.purchaseSweet(id, quantity, userId);
      res.status(200).json(sweet);
    } catch (error: any) {
      if (error.message === 'Sweet not found or insufficient quantity') {
        res.status(400).json({ error: error.message });
      } else if (error.message.includes('must be positive')) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  static async restockSweet(req: AuthRequest, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const id = parseInt(req.params.id);
      const { quantity } = req.body;
      const sweet = await SweetService.restockSweet(id, quantity);
      res.status(200).json(sweet);
    } catch (error: any) {
      if (error.message === 'Sweet not found') {
        res.status(404).json({ error: error.message });
      } else if (error.message.includes('must be positive')) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
}

