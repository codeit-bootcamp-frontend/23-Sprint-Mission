import Image from "next/image";
import styles from "./EmptyState.module.css";

interface EmptyStateProps {
  type: "todo" | "done";
}

export default function EmptyState({ type }: EmptyStateProps) {
  const isTodo = type === "todo";

  return (
    <div className={styles.container}>
      <Image
        src={
          isTodo
            ? "/images/empty/empty-todo.svg"
            : "/images/empty/empty-done.svg"
        }
        alt={isTodo ? "할 일 없음 이미지" : "완료한 일 없음 이미지"}
        width={240}
        height={180}
        loading="eager"
        className={styles.image}
      />

      <p className={styles.text}>
        {isTodo
          ? "할 일이 없어요.\nTODO를 새롭게 추가해주세요!"
          : "아직 다 한 일이 없어요.\n해야 할 일을 체크해보세요!"}
      </p>
    </div>
  );
}