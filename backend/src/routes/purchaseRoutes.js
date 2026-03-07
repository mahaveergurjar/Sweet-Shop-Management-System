import { Router } from "express";
import { PurchaseController } from "../controllers/purchaseController.js";
import { authenticate } from "../middleware/auth.js";
const router = Router();

// All routes require authentication
router.use(authenticate);

// Get user's purchase history
router.get("/history", PurchaseController.getPurchaseHistory);

// Batch purchase (Cart checkout)
router.post("/batch", PurchaseController.batchPurchase);
export default router;
