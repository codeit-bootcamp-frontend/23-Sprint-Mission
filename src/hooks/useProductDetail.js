import { useEffect, useState } from "react";
import { getProductDetail, getProductComments } from "../data/products";

export default function useProductDetail(productId) {
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    async function fetchData() {
      setLoading(true);

      // 상품 상세
      try {
        const productData = await getProductDetail(productId);
        setProduct(productData);
      } catch (error) {
        console.error("상품 상세 조회 실패:", error);
        setProduct(null);
      }

      // 댓글 (실패해도 페이지 유지)
      try {
        const commentData = await getProductComments(productId);
        setComments(commentData.list ?? commentData);
      } catch (error) {
        console.error("댓글 조회 실패:", error);
        setComments([]);
      }

      setLoading(false);
    }

    fetchData();
  }, [productId]);

  return { product, comments, loading };
}