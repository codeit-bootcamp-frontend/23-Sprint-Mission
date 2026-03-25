import { useCallback, useEffect, useState } from "react";
import { getProductDetail } from "../data/productsApi";
import { getProductComments } from "../data/commentApi";

export default function useProductDetail(productId) {
  // 상품 / 댓글 / 로딩 상태
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  // 댓글만 다시 조회하는 함수
  const fetchComments = useCallback(async () => {
    try {
      // 댓글 조회 시 limit, cursor 전달
      const commentData = await getProductComments(productId, null, 10);
      setComments(commentData.list ?? []);
    } catch (error) {
      console.error("댓글 조회 실패:", error);
      setComments([]);
    }
  }, [productId]);

  useEffect(() => {
    if (!productId) return;

    async function fetchData() {
      setLoading(true);

      // 상품 상세 조회
      try {
        const productData = await getProductDetail(productId);
        setProduct(productData);
      } catch (error) {
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