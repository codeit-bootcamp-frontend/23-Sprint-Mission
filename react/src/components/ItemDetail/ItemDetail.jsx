import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct, getProductComments } from "../../api/data";
import ItemInfo from "./ItemInfo";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
import BackButton from "./BackButton";
import styles from "./ItemDetail.module.css";

function ItemDetail() {
  const { productId } = useParams();

  const [item, setItem] = useState(null);
  const [comments, setComments] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const [productData, commentsData] = await Promise.all([
          getProduct(productId),
          getProductComments(productId, 3),
        ]);

        setItem(productData);
        setComments(commentsData);
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (productId) loadData();
  }, [productId]);

  if (isLoading) return <div>로딩 중...</div>;
  if (!item) return <div>상품을 찾을 수 없습니다.</div>;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.mainContent}>
        <ItemInfo item={item} />
        <div className={styles.commentSection}>
          <CommentForm productId={productId} setComments={setComments} />
          <Comments
            productId={productId}
            comments={comments}
            setComments={setComments}
          />
        </div>
      </div>
      <BackButton />
    </div>
  );
}

export default ItemDetail;
