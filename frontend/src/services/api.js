import axios from "axios";
const API_BASE_URL =
  (import.meta.env.VITE_API_URL || "http://localhost:3001") + "/api";
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
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
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
export const authService = {
  register: async (email, password) => {
    const response = await api.post("/auth/register", {
      email,
      password,
    });
    return response.data;
  },
  login: async (email, password) => {
    const response = await api.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  },
};
export const sweetService = {
  getAll: async () => {
    const response = await api.get("/sweets");
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/sweets/${id}`);
    return response.data;
  },
  search: async (filters) => {
    const params = new URLSearchParams();
    if (filters.name) params.append("name", filters.name);
    if (filters.category) params.append("category", filters.category);
    if (filters.minPrice !== undefined)
      params.append("minPrice", filters.minPrice.toString());
    if (filters.maxPrice !== undefined)
      params.append("maxPrice", filters.maxPrice.toString());
    const response = await api.get(`/sweets/search?${params.toString()}`);
    return response.data;
  },
  create: async (input) => {
    const response = await api.post("/sweets", input);
    return response.data;
  },
  update: async (id, input) => {
    const response = await api.put(`/sweets/${id}`, input);
    return response.data;
  },
  delete: async (id) => {
    await api.delete(`/sweets/${id}`);
  },
  purchase: async (id, quantity = 1) => {
    const response = await api.post(`/sweets/${id}/purchase`, {
      quantity,
    });
    return response.data;
  },
  restock: async (id, quantity) => {
    const response = await api.post(`/sweets/${id}/restock`, {
      quantity,
    });
    return response.data;
  },
};
export const purchaseService = {
  getHistory: async () => {
    const response = await api.get("/purchases/history");
    return response.data;
  },
  batchPurchase: async (items) => {
    const response = await api.post("/purchases/batch", { items });
    return response.data;
  },
};
export const adminService = {
  getStats: async () => {
    const response = await api.get("/admin/stats");
    return response.data;
  },
};
