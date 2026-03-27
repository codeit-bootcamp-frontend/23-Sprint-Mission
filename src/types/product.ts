export interface Product {
  id: number | string;
  name: string;
  price: number;
  favoriteCount: number;
  createdAt: string;
  images?: string[];
}