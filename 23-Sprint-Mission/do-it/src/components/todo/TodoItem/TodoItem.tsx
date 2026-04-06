"use client";

import type { Todo } from "@/types/todo";
import { classNames } from "@/lib/utils/classNames";
import styles from "./TodoItem.module.css";

interface TodoItemProps {
  todo: Todo;
  onToggle: (todo: Todo) => void;
}

export default function TodoItem({ todo, onToggle }: TodoItemProps) {
  return (
    <li
      className={classNames(styles.item, todo.isCompleted && styles.completed)}
    >
      <button
        type="button"
        className={classNames(
          styles.checkButton,
          todo.isCompleted && styles.checked,
        )}
        // 클릭하면 완료 / 미완료 상태를 바꿈
        onClick={() => onToggle(todo)}
        aria-label={todo.isCompleted ? "미완료로 변경" : "완료로 변경"}
      >
        {todo.isCompleted ? "✓" : ""}
      </button>

      <span className={styles.text}>{todo.name}</span>
    </li>
  );
}
