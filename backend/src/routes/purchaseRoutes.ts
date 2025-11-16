import { Router } from 'express';
import { PurchaseController } from '../controllers/purchaseController';
import { authenticate } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Get user's purchase history
router.get('/history', PurchaseController.getPurchaseHistory);

export default router;

