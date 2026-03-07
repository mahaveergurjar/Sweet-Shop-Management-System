import { PurchaseModel } from "../models/Purchase.js";
export class PurchaseService {
  static async getPurchaseHistory(userId) {
    return await PurchaseModel.findByUserId(userId);
  }

  static async batchPurchase(userId, items) {
    return await PurchaseModel.createBatch(userId, items);
  }
}
