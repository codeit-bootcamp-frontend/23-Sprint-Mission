import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useProductDetail from "../../hooks/useProductDetail";
import useCommentCreate from "../../hooks/useCommentCreate";
import CommentItem from "../../components/CommentItem/CommentItem";
import profileIcon from "../../assets/images/ic_profile.svg";
import heartIcon from "../../assets/images/ic_heart.svg";
import "./ItemDetailPage.css";

export default function ItemDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  // 상품 상세 / 댓글 조회
  const { product, comments, loading, refetchComments } =
    useProductDetail(productId);

  // 댓글 등록
  const { createComment, submitting } = useCommentCreate(productId);

  // textarea 입력값
  const [commentInput, setCommentInput] = useState<string>("");

  // 입력값이 있고, 등록 중이 아닐 때만 버튼 활성화
  const isCommentActive = commentInput.trim() !== "" && !submitting;

  // 날짜 포맷
  const formattedDate = product?.createdAt
    ? product.createdAt.slice(0, 10).replace(/-/g, ". ")
    : "";

  // 등록 버튼 클릭
  const handleSubmitComment = async (): Promise<void> => {
    if (!commentInput.trim()) return;

    try {
      await createComment(commentInput);
      setCommentInput("");
      await refetchComments();
    } catch (error: unknown) {
      console.error("댓글 등록 실패:", error);
      alert("댓글 등록에 실패했습니다.");
    }
  };

  if (loading) {
    return <div className="itemDetailMessage">로딩 중...</div>;
  }

  if (!product) {
    return (
      <div className="itemDetailMessage">상품 정보를 불러오지 못했습니다.</div>
    );
  }

  return (
    <main className="itemDetailPage wrapper">
      {/* 상품 상세 */}
      <section className="itemDetailTop">
        <div className="itemImageBox">
          {product.images?.[0] && (
            <img
              src={product.images[0]}
              alt={product.name}
              className="itemDetailImage"
            />
          )}
        </div>

        <div className="itemInfoBox">
          {/* 상품명 / 가격 */}
          <h1 className="itemName">{product.name}</h1>
          <p className="itemPrice">{product.price?.toLocaleString()}원</p>

          {/* 상품 소개 */}
          <div className="infoBlock">
            <h2 className="infoTitle">상품 소개</h2>
            <p className="itemDescription">
              {product.description || "상품 설명이 없습니다."}
            </p>
          </div>

          {/* 상품 태그 */}
          <div className="infoBlock">
            <h2 className="infoTitle">상품 태그</h2>
            <div className="tagList">
              {product.tags && product.tags.length > 0 ? (
                product.tags.map((tag, index) => (
                  <span key={index} className="tagItem">
                    #{tag}
                  </span>
                ))
              ) : (
                <span className="tagItem">태그 없음</span>
              )}
            </div>
          </div>

          {/* 작성자 / 날짜 / 관심 수 */}
          <div className="itemBottomInfo">
            <div className="sellerInfo">
              <img
                src={product.owner?.image || profileIcon}
                alt={product.ownerNickname || "판매자 프로필"}
                className="sellerProfile"
              />

              <div className="sellerText">
                <span className="sellerName">
                  {product.ownerNickname || "판매자"}
                </span>
                <span className="sellerDate">{formattedDate}</span>
              </div>
            </div>

            <div className="favoriteBox">
              <img src={heartIcon} alt="관심" className="favoriteIcon" />
              <span className="favoriteCount">
                {product.favoriteCount ?? 0}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 댓글 영역 */}
      <section className="commentSection">
        <h2 className="commentTitle">문의하기</h2>

        <textarea
          className="commentTextarea"
          value={commentInput}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setCommentInput(e.target.value)
          }
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
        />

        <div className="commentButtonRow">
          <button
            type="button"
            className={`commentSubmitButton ${isCommentActive ? "active" : ""}`}
            disabled={!isCommentActive}
            onClick={handleSubmitComment}
          >
            {submitting ? "등록 중" : "등록"}
          </button>
        </div>

        {comments.length === 0 ? (
          <div className="emptyCommentBox">아직 문의가 없어요</div>
        ) : (
          <div className="commentList">
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onRefreshComments={refetchComments}
              />
            ))}
          </div>
        )}

        <div className="backButtonRow">
          <button
            type="button"
            className="backButton"
            onClick={() => navigate("/items")}
          >
            목록으로 돌아가기
          </button>
        </div>
      </section>
    </main>
  );
}