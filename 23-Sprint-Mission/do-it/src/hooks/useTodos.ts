"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createTodo, getTodos, updateTodo } from "@/lib/api/todo";
import type { Todo } from "@/types/todo";

export default function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");

  const fetchTodos = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");

      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      console.error(error);
      setError("할 일 목록을 불러오지 못했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleCreateTodo = useCallback(async (name: string) => {
    try {
      setIsCreating(true);
      setError("");

      const createdTodo = await createTodo({ name });
      setTodos((prev) => [createdTodo, ...prev]);
    } catch (error) {
      console.error(error);
      setError("할 일 추가에 실패했습니다.");
    } finally {
      setIsCreating(false);
    }
  }, []);

  const handleToggleTodo = useCallback(async (todo: Todo) => {
    const nextCompleted = !todo.isCompleted;

    setTodos((prev) =>
      prev.map((item) =>
        item.id === todo.id ? { ...item, isCompleted: nextCompleted } : item,
      ),
    );

    try {
      await updateTodo(todo.id, { isCompleted: nextCompleted });
    } catch (error) {
      console.error(error);
      setError("상태 변경에 실패했습니다.");

      setTodos((prev) =>
        prev.map((item) =>
          item.id === todo.id
            ? { ...item, isCompleted: todo.isCompleted }
            : item,
        ),
      );
    }
  }, []);

  const todoItems = useMemo(
    () => todos.filter((item) => !item.isCompleted),
    [todos],
  );

  const doneItems = useMemo(
    () => todos.filter((item) => item.isCompleted),
    [todos],
  );

  return {
    todoItems,
    doneItems,
    isLoading,
    isCreating,
    error,
    handleCreateTodo,
    handleToggleTodo,
  };
}
