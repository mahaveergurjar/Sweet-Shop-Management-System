import pool from '../config/database';

export interface Purchase {
  id: number;
  user_id: number;
  sweet_id: number;
  quantity: number;
  price_per_unit: number;
  total_price: number;
  sweet_name: string;
  sweet_category: string;
  created_at: Date;
}

export interface CreatePurchaseInput {
  user_id: number;
  sweet_id: number;
  quantity: number;
  price_per_unit: number;
  total_price: number;
  sweet_name: string;
  sweet_category: string;
}

export class PurchaseModel {
  static async create(input: CreatePurchaseInput): Promise<Purchase> {
    const result = await pool.query(
      `INSERT INTO purchases (user_id, sweet_id, quantity, price_per_unit, total_price, sweet_name, sweet_category)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        input.user_id,
        input.sweet_id,
        input.quantity,
        input.price_per_unit,
        input.total_price,
        input.sweet_name,
        input.sweet_category,
      ]
    );
    return this.mapRowToPurchase(result.rows[0]);
  }

  static async findByUserId(userId: number): Promise<Purchase[]> {
    const result = await pool.query(
      'SELECT * FROM purchases WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    return result.rows.map(row => this.mapRowToPurchase(row));
  }

  private static mapRowToPurchase(row: any): Purchase {
    return {
      id: row.id,
      user_id: row.user_id,
      sweet_id: row.sweet_id,
      quantity: row.quantity,
      price_per_unit: parseFloat(row.price_per_unit),
      total_price: parseFloat(row.total_price),
      sweet_name: row.sweet_name,
      sweet_category: row.sweet_category,
      created_at: row.created_at,
    };
  }
}

