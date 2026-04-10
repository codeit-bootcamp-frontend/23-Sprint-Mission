"use client";

import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import useTodoForm from "@/hooks/useTodoForm";
import styles from "./TodoForm.module.css";

interface TodoFormProps {
  onSubmit: (value: string) => Promise<void>;
  isSubmitting: boolean;
}

export default function TodoForm({ onSubmit, isSubmitting }: TodoFormProps) {
  const { value, handleChange, handleSubmit, handleKeyDown } = useTodoForm({
    onSubmit,
  });

  return (
    <section className={styles.container}>
      <Input
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="할 일을 입력해주세요"
        aria-label="할 일 입력"
      />

      <Button
        type="button"
        onClick={handleSubmit}
        // 요청 중이거나 공백만 입력했으면 비활성화
        disabled={isSubmitting || !value.trim()}
        filled={Boolean(value.trim())}
      >
        + 추가하기
      </Button>
    </section>
  );
}
