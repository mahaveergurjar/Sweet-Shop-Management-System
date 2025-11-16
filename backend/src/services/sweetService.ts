import { SweetModel, CreateSweetInput, UpdateSweetInput, SearchFilters } from '../models/Sweet';
import { PurchaseModel } from '../models/Purchase';

export class SweetService {
  static async createSweet(input: CreateSweetInput) {
    if (input.price < 0) {
      throw new Error('Price cannot be negative');
    }
    if (input.quantity < 0) {
      throw new Error('Quantity cannot be negative');
    }
    return await SweetModel.create(input);
  }

  static async getAllSweets() {
    return await SweetModel.findAll();
  }

  static async getSweetById(id: number) {
    const sweet = await SweetModel.findById(id);
    if (!sweet) {
      throw new Error('Sweet not found');
    }
    return sweet;
  }

  static async searchSweets(filters: SearchFilters) {
    return await SweetModel.search(filters);
  }

  static async updateSweet(id: number, input: UpdateSweetInput) {
    if (input.price !== undefined && input.price < 0) {
      throw new Error('Price cannot be negative');
    }
    if (input.quantity !== undefined && input.quantity < 0) {
      throw new Error('Quantity cannot be negative');
    }

    const sweet = await SweetModel.update(id, input);
    if (!sweet) {
      throw new Error('Sweet not found');
    }
    return sweet;
  }

  static async deleteSweet(id: number) {
    const deleted = await SweetModel.delete(id);
    if (!deleted) {
      throw new Error('Sweet not found');
    }
    return { message: 'Sweet deleted successfully' };
  }

  static async purchaseSweet(id: number, quantity: number = 1, userId: number) {
    if (quantity <= 0) {
      throw new Error('Purchase quantity must be positive');
    }

    // Get sweet details before purchase for recording
    const sweetBeforePurchase = await SweetModel.findById(id);
    if (!sweetBeforePurchase) {
      throw new Error('Sweet not found or insufficient quantity');
    }

    const sweet = await SweetModel.purchase(id, quantity);
    if (!sweet) {
      throw new Error('Sweet not found or insufficient quantity');
    }

    // Record the purchase
    await PurchaseModel.create({
      user_id: userId,
      sweet_id: id,
      quantity: quantity,
      price_per_unit: sweetBeforePurchase.price,
      total_price: sweetBeforePurchase.price * quantity,
      sweet_name: sweetBeforePurchase.name,
      sweet_category: sweetBeforePurchase.category,
    });

    return sweet;
  }

  static async restockSweet(id: number, quantity: number) {
    if (quantity <= 0) {
      throw new Error('Restock quantity must be positive');
    }

    const sweet = await SweetModel.restock(id, quantity);
    if (!sweet) {
      throw new Error('Sweet not found');
    }
    return sweet;
  }
}

