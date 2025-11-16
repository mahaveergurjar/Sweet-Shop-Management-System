import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { PurchaseService } from '../services/purchaseService';

export class PurchaseController {
  static async getPurchaseHistory(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user!.userId;
      const purchases = await PurchaseService.getPurchaseHistory(userId);
      res.status(200).json(purchases);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

