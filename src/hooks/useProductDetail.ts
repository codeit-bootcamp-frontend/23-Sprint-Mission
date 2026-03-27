import { useCallback, useEffect, useState } from "react";
import { getProductDetail } from "../data/productsApi";
import { getProductComments } from "../data/commentApi";
import type { Product } from "../types/product";

interface Comment {
  id: number | string;
  content: string;
  [key: string]: unknown;
}

interface CommentListResponse {
  list?: Comment[];
}

interface UseProductDetailReturn {
  product: Product | null;
  comments: Comment[];
  loading: boolean;
  refetchComments: () => Promise<void>;
}

export default function useProductDetail(
  productId?: string,
): UseProductDetailReturn {
  // 상품 / 댓글 / 로딩 상태
  const [product, setProduct] = useState<Product | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 댓글만 다시 조회하는 함수
  const fetchComments = useCallback(async (): Promise<void> => {
    if (!productId) {
      setComments([]);
      return;
    }

    try {
      // 댓글 조회 시 limit, cursor 전달
      const commentData = (await getProductComments(
        productId,
        null,
        10,
      )) as CommentListResponse;

      setComments(commentData.list ?? []);
    } catch (error: unknown) {
      console.error("댓글 조회 실패:", error);
      setComments([]);
    }
  }, [productId]);

  useEffect(() => {
    if (!productId) return;

    async function fetchData(): Promise<void> {
      if (!productId) return;

      setLoading(true);

      // 상품 상세 조회
      try {
        const productData = await getProductDetail(productId);
        setProduct(productData);
      } catch (error: unknown) {
        console.error("상품 상세 조회 실패:", error);
        setProduct(null);
      }

      // 댓글 조회
      await fetchComments();

      setLoading(false);
    }

    fetchData();
  }, [productId, fetchComments]);

  return { product, comments, loading, refetchComments: fetchComments };
}
