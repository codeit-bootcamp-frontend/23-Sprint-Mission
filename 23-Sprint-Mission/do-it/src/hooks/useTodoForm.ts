"use client";

import { ChangeEvent, KeyboardEvent, useState } from "react";

interface UseTodoFormProps {
  onSubmit: (value: string) => Promise<void>;
}

export default function useTodoForm({ onSubmit }: UseTodoFormProps) {
  const [value, setValue] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = async () => {
    const nextValue = value.trim();

    if (!nextValue) return;

    await onSubmit(nextValue);
    setValue("");
  };

  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    await handleSubmit();
  };

  return {
    value,
    handleChange,
    handleSubmit,
    handleKeyDown,
  };
}
