import { useState } from "react";
import { getProductComments, postProductComment } from "../../api/data";
import ButtonAdditem from "../Additem/ButtonAdditem";
import styles from "./CommentForm.module.css";

function CommentForm({ productId, setComments }) {
  const [commentValue, setCommentValue] = useState("");

  const submit = async (formData) => {
    try {
      const data = Object.fromEntries(formData.entries());
      await postProductComment(productId, data);
      alert("코멘트 등록 성공!");

      const updatedComments = await getProductComments(productId, 3);
      setComments(updatedComments);
      setCommentValue(null);
    } catch (error) {
      console.error("등록 실패:", error);
    }
  };

  return (
    <div className={styles.commentFormContainer}>
      <form
        id="add-comment-form"
        action={submit}
        className={styles.commentForm}
      >
        <label className={styles.formLabel}>문의하기</label>
        <textarea
          name="content"
          className={styles.formTextarea}
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.
"
        ></textarea>
      </form>
      <ButtonAdditem
        disabled={commentValue ? false : true}
        form="add-comment-form"
      />
    </div>
  );
}

export default CommentForm;
