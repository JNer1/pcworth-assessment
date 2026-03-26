export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: string;
  stock: number;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface AuthData {
  user: User;
  access_token: string;
  token_type: string;
}
