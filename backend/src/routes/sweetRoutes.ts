import { Router } from 'express';
import { SweetController } from '../controllers/sweetController';
import { authenticate, requireAdmin } from '../middleware/auth';
import { body, param } from 'express-validator';

const router = Router();

// All routes require authentication
router.use(authenticate);

const createSweetValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
];

const updateSweetValidation = [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('category').optional().notEmpty().withMessage('Category cannot be empty'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('quantity').optional().isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
];

const idValidation = [
  param('id').isInt({ min: 1 }).withMessage('Valid ID is required'),
];

const purchaseValidation = [
  body('quantity').optional().isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
];

const restockValidation = [
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
];

// Public routes (authenticated users)
router.get('/', SweetController.getAllSweets);
router.get('/search', SweetController.searchSweets);
router.get('/:id', idValidation, SweetController.getSweetById);
router.post('/:id/purchase', idValidation, purchaseValidation, SweetController.purchaseSweet);

// Admin-only routes
router.post('/', createSweetValidation, requireAdmin, SweetController.createSweet);
router.put('/:id', idValidation, updateSweetValidation, requireAdmin, SweetController.updateSweet);
router.delete('/:id', idValidation, requireAdmin, SweetController.deleteSweet);
router.post('/:id/restock', idValidation, restockValidation, requireAdmin, SweetController.restockSweet);

export default router;

