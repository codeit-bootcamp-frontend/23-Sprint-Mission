"use client";

import Button from "@/components/common/Button/Button";
import { classNames } from "@/lib/utils/classNames";
import type { Todo } from "@/types/todo";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import styles from "./TodoDetailForm.module.css";

interface TodoDetailFormProps {
  todo: Todo;
}

export default function TodoDetailForm({ todo }: TodoDetailFormProps) {
  const [name, setName] = useState(todo.name);
  const [memo, setMemo] = useState(todo.memo ?? "");
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleMemoChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(event.target.value);
  };

  const handleCompletedToggle = () => {
    setIsCompleted((prev) => !prev);
  };

  return (
    <form className={styles.form}>
      <label
        className={classNames(
          styles.titleField,
          isCompleted && styles.completedTitle,
        )}
      >
        <button
          type="button"
          className={classNames(
            styles.checkButton,
            isCompleted && styles.checked,
          )}
          onClick={handleCompletedToggle}
          aria-label={isCompleted ? "미완료로 변경" : "완료로 변경"}
        >
          {isCompleted ? "✓" : ""}
        </button>

        <input
          className={styles.titleInput}
          value={name}
          onChange={handleNameChange}
          aria-label="할 일 이름"
        />
      </label>

      <div className={styles.content}>
        <div className={styles.imageField}>
          {todo.imageUrl ? (
            <Image
              className={styles.previewImage}
              src={todo.imageUrl}
              alt={`${todo.name} 첨부 이미지`}
              fill
              sizes="(max-width: 743px) 100vw, 400px"
            />
          ) : (
            <span className={styles.emptyImageIcon} aria-hidden="true">
              +
            </span>
          )}

          <button
            type="button"
            className={styles.imageButton}
            aria-label={todo.imageUrl ? "이미지 변경" : "이미지 추가"}
          >
            {todo.imageUrl ? "✎" : "+"}
          </button>
        </div>

        <label className={styles.memoField}>
          <span className={styles.memoTitle}>Memo</span>
          <textarea
            className={styles.memoTextarea}
            value={memo}
            onChange={handleMemoChange}
            aria-label="메모"
          />
        </label>
      </div>

      <div className={styles.actions}>
        <Button type="button" className={styles.saveButton}>
          ✓ 수정 완료
        </Button>
        <Button type="button" className={styles.deleteButton}>
          × 삭제하기
        </Button>
      </div>
    </form>
  );
}
