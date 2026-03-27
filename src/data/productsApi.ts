import axios from "../utils/axios";
import type { Product } from "../types/product";

type OrderBy = "recent" | "favorite";

export interface GetProductsParams {
  orderBy?: OrderBy;
  keyword?: string;
  page?: number;
  pageSize?: number;
}

export interface ProductListResponse {
  list: Product[];
  totalCount: number;
  [key: string]: unknown;
}

export interface ProductDetail extends Product {
  description?: string;
}

// 상품 목록 조회
export const getProducts = async (
  params: GetProductsParams = {}
): Promise<ProductListResponse> => {
  const { data } = await axios.get<ProductListResponse>("/products", { params });

  const list = [...data.list];

  if (params.orderBy === "recent") {
    list.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  if (params.orderBy === "favorite") {
    list.sort((a, b) => b.favoriteCount - a.favoriteCount);
  }

  return {
    ...data,
    list,
  };
};

// 상품 상세 조회
export const getProductDetail = async (
  productId: number | string
): Promise<ProductDetail> => {
  const { data } = await axios.get<ProductDetail>(`/products/${productId}`);
  console.log("요청 URL:", `/products/${productId}`);
  return data;
};