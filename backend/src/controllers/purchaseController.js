import { PurchaseService } from "../services/purchaseService.js";
export class PurchaseController {
  static async getPurchaseHistory(req, res) {
    try {
      const userId = req.user.userId;
      const purchases = await PurchaseService.getPurchaseHistory(userId);
      res.status(200).json(purchases);
    } catch (error) {
      res.status(500).json({
        error: "Internal server error",
      });
    }
  }

  static async batchPurchase(req, res) {
    try {
      const userId = req.user.userId;
      const { items } = req.body;

      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: "Cart is empty" });
      }

      const results = await PurchaseService.batchPurchase(userId, items);
      res.status(201).json({ message: "Purchase successful", results });
    } catch (error) {
      if (error.message.startsWith("Insufficient stock")) {
        return res.status(400).json({ error: error.message });
      }
      console.error("Batch purchase error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
