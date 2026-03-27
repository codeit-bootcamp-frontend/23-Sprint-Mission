export interface ProductOwner {
  image?: string;
}

export interface Product {
  id: number | string;
  name: string;
  price: number;
  favoriteCount: number;
  createdAt: string;
  images?: string[];

  description?: string;
  tags?: string[];
  owner?: ProductOwner;
  ownerNickname?: string;
}