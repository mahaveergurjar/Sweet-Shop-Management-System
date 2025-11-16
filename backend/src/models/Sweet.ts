import pool from '../config/database';

export interface Sweet {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateSweetInput {
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export interface UpdateSweetInput {
  name?: string;
  category?: string;
  price?: number;
  quantity?: number;
}

export interface SearchFilters {
  name?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export class SweetModel {
  // Helper function to convert database row to Sweet object with proper types
  private static mapRowToSweet(row: any): Sweet {
    return {
      id: row.id,
      name: row.name,
      category: row.category,
      price: parseFloat(row.price),
      quantity: row.quantity,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }

  static async create(input: CreateSweetInput): Promise<Sweet> {
    const result = await pool.query(
      'INSERT INTO sweets (name, category, price, quantity) VALUES ($1, $2, $3, $4) RETURNING *',
      [input.name, input.category, input.price, input.quantity]
    );
    return this.mapRowToSweet(result.rows[0]);
  }

  static async findAll(): Promise<Sweet[]> {
    const result = await pool.query('SELECT * FROM sweets ORDER BY created_at DESC');
    return result.rows.map(row => this.mapRowToSweet(row));
  }

  static async findById(id: number): Promise<Sweet | null> {
    const result = await pool.query('SELECT * FROM sweets WHERE id = $1', [id]);
    return result.rows[0] ? this.mapRowToSweet(result.rows[0]) : null;
  }

  static async search(filters: SearchFilters): Promise<Sweet[]> {
    let query = 'SELECT * FROM sweets WHERE 1=1';
    const params: any[] = [];
    let paramIndex = 1;

    if (filters.name) {
      query += ` AND name ILIKE $${paramIndex}`;
      params.push(`%${filters.name}%`);
      paramIndex++;
    }

    if (filters.category) {
      query += ` AND category ILIKE $${paramIndex}`;
      params.push(`%${filters.category}%`);
      paramIndex++;
    }

    if (filters.minPrice !== undefined) {
      query += ` AND price >= $${paramIndex}`;
      params.push(filters.minPrice);
      paramIndex++;
    }

    if (filters.maxPrice !== undefined) {
      query += ` AND price <= $${paramIndex}`;
      params.push(filters.maxPrice);
      paramIndex++;
    }

    query += ' ORDER BY created_at DESC';

    const result = await pool.query(query, params);
    return result.rows.map(row => this.mapRowToSweet(row));
  }

  static async update(id: number, input: UpdateSweetInput): Promise<Sweet | null> {
    const updates: string[] = [];
    const params: any[] = [];
    let paramIndex = 1;

    if (input.name !== undefined) {
      updates.push(`name = $${paramIndex}`);
      params.push(input.name);
      paramIndex++;
    }

    if (input.category !== undefined) {
      updates.push(`category = $${paramIndex}`);
      params.push(input.category);
      paramIndex++;
    }

    if (input.price !== undefined) {
      updates.push(`price = $${paramIndex}`);
      params.push(input.price);
      paramIndex++;
    }

    if (input.quantity !== undefined) {
      updates.push(`quantity = $${paramIndex}`);
      params.push(input.quantity);
      paramIndex++;
    }

    if (updates.length === 0) {
      return this.findById(id);
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    params.push(id);

    const result = await pool.query(
      `UPDATE sweets SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
      params
    );

    return result.rows[0] ? this.mapRowToSweet(result.rows[0]) : null;
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM sweets WHERE id = $1', [id]);
    return result.rowCount !== null && result.rowCount > 0;
  }

  static async purchase(id: number, quantity: number): Promise<Sweet | null> {
    const result = await pool.query(
      'UPDATE sweets SET quantity = quantity - $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 AND quantity >= $1 RETURNING *',
      [quantity, id]
    );
    return result.rows[0] ? this.mapRowToSweet(result.rows[0]) : null;
  }

  static async restock(id: number, quantity: number): Promise<Sweet | null> {
    const result = await pool.query(
      'UPDATE sweets SET quantity = quantity + $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [quantity, id]
    );
    return result.rows[0] ? this.mapRowToSweet(result.rows[0]) : null;
  }
}

