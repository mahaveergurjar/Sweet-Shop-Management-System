import axios from 'axios';
import { AuthResponse, Sweet, CreateSweetInput, UpdateSweetInput, SearchFilters, Purchase } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  register: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', { email, password });
    return response.data;
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', { email, password });
    return response.data;
  },
};

export const sweetService = {
  getAll: async (): Promise<Sweet[]> => {
    const response = await api.get<Sweet[]>('/sweets');
    return response.data;
  },

  getById: async (id: number): Promise<Sweet> => {
    const response = await api.get<Sweet>(`/sweets/${id}`);
    return response.data;
  },

  search: async (filters: SearchFilters): Promise<Sweet[]> => {
    const params = new URLSearchParams();
    if (filters.name) params.append('name', filters.name);
    if (filters.category) params.append('category', filters.category);
    if (filters.minPrice !== undefined) params.append('minPrice', filters.minPrice.toString());
    if (filters.maxPrice !== undefined) params.append('maxPrice', filters.maxPrice.toString());
    
    const response = await api.get<Sweet[]>(`/sweets/search?${params.toString()}`);
    return response.data;
  },

  create: async (input: CreateSweetInput): Promise<Sweet> => {
    const response = await api.post<Sweet>('/sweets', input);
    return response.data;
  },

  update: async (id: number, input: UpdateSweetInput): Promise<Sweet> => {
    const response = await api.put<Sweet>(`/sweets/${id}`, input);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/sweets/${id}`);
  },

  purchase: async (id: number, quantity: number = 1): Promise<Sweet> => {
    const response = await api.post<Sweet>(`/sweets/${id}/purchase`, { quantity });
    return response.data;
  },

  restock: async (id: number, quantity: number): Promise<Sweet> => {
    const response = await api.post<Sweet>(`/sweets/${id}/restock`, { quantity });
    return response.data;
  },
};

export const purchaseService = {
  getHistory: async (): Promise<Purchase[]> => {
    const response = await api.get<Purchase[]>('/purchases/history');
    return response.data;
  },
};

