export interface User {
  id: number;
  email: string;
  isAdmin: boolean;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Sweet {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  created_at: string;
  updated_at: string;
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

export interface Purchase {
  id: number;
  user_id: number;
  sweet_id: number;
  quantity: number;
  price_per_unit: number;
  total_price: number;
  sweet_name: string;
  sweet_category: string;
  created_at: string;
}

