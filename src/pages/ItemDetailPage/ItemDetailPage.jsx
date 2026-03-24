import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useProductDetail from "../../hooks/useProductDetail";
import CommentItem from "../../components/CommentItem/CommentItem";
import "./ItemDetailPage.css";

export default function ItemDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const { product, comments, loading } = useProductDetail(productId);

  const [commentInput, setCommentInput] = useState("");
  const isCommentActive = commentInput.trim() !== "";

  if (loading) {
    return <div className="itemDetailMessage">로딩 중...</div>;
  }

  if (!product) {
    return <div className="itemDetailMessage">상품 정보를 불러오지 못했습니다.</div>;
  }

  return (
    <main className="itemDetailPage wrapper">
      <section className="itemDetailTop">
        <div className="itemImageBox">
          <img
            src={product.images?.[0] || ""}
            alt={product.name}
            className="itemDetailImage"
          />
        </div>

        <div className="itemInfoBox">
          <h1 className="itemName">{product.name}</h1>
          <p className="itemPrice">{product.price?.toLocaleString()}원</p>

          <div className="infoBlock">
            <h3 className="infoTitle">상품 소개</h3>
            <p className="itemDescription">{product.description}</p>
          </div>

          <div className="infoBlock">
            <h3 className="infoTitle">상품 태그</h3>
            <div className="tagList">
              {product.tags?.map((tag) => (
                <span key={tag} className="tagItem">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="favoriteBox">
            ♡ <span>{product.favoriteCount}</span>
          </div>
        </div>
      </section>

      <section className="commentSection">
        <h2 className="commentTitle">문의하기</h2>

        <textarea
          className="commentTextarea"
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포 시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
        />

        <div className="commentButtonRow">
          <button
            type="button"
            className={`commentSubmitButton ${isCommentActive ? "active" : ""}`}
            disabled={!isCommentActive}
          >
            등록
          </button>
        </div>

        {comments.length === 0 ? (
          <div className="emptyCommentBox">아직 문의가 없어요</div>
        ) : (
          <div className="commentList">
            {comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
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