import { PurchaseModel } from '../models/Purchase';

export class PurchaseService {
  static async getPurchaseHistory(userId: number) {
    return await PurchaseModel.findByUserId(userId);
  }
}

