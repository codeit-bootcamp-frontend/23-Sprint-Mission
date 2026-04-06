import type { Todo } from "@/types/todo";
import { classNames } from "@/lib/utils/classNames";
import TodoItem from "../TodoItem/TodoItem";
import styles from "./TodoSection.module.css";

interface TodoSectionProps {
  title: string;
  variant: "todo" | "done";
  items: Todo[];
  onToggle: (todo: Todo) => void;
}

export default function TodoSection({
  title,
  variant,
  items,
  onToggle,
}: TodoSectionProps) {
  return (
    <section className={styles.section}>
      <div
        className={classNames(
          styles.badge,
          // 완료 영역이면 색상만 다르게 처리
          variant === "done" && styles.doneBadge,
        )}
      >
        {title}
      </div>

      <ul className={styles.list}>
        {items.map((item) => (
          <TodoItem key={item.id} todo={item} onToggle={onToggle} />
        ))}
      </ul>
    </section>
  );
}
