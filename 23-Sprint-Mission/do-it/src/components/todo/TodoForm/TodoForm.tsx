"use client";

import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import useTodoForm from "@/hooks/useTodoForm";
import { FormEvent } from "react";
import styles from "./TodoForm.module.css";

interface TodoFormProps {
  onSubmit: (value: string) => Promise<void>;
  isSubmitting: boolean;
}

export default function TodoForm({ onSubmit, isSubmitting }: TodoFormProps) {
  const { value, handleChange, handleSubmit } = useTodoForm({
    onSubmit,
  });

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit();
  };

  return (
    <form className={styles.container} onSubmit={handleFormSubmit}>
      <Input
        value={value}
        onChange={handleChange}
        placeholder="할 일을 입력해주세요"
        aria-label="할 일 입력"
      />

      <Button
        type="submit"
        disabled={isSubmitting || !value.trim()}
        filled={Boolean(value.trim())}
      >
        + 추가하기
      </Button>
    </form>
  );
}
