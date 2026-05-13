"use client";

import { ChangeEvent, useState } from "react";

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

  return {
    value,
    handleChange,
    handleSubmit,
  };
}
