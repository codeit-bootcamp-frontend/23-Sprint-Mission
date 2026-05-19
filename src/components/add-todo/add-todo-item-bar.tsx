"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postTodoItem } from "@/action/item";
import { ResponseGetTodoItems } from "@/types/todo-items";

import { TodoButton } from "../todo-button";

import { AddTodoInput } from "./add-todo-input";

export function AddTodoItemBar() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: postTodoItem,
    onMutate: async (formData: FormData) => {
      const name = String(formData.get("name"));

      await queryClient.cancelQueries({ queryKey: ["todo-list"] });

      const previousTodoList =
        queryClient.getQueryData<ResponseGetTodoItems>(["todo-list"]) || [];

      queryClient.setQueryData<ResponseGetTodoItems>(
        ["todo-list"],
        [
          ...previousTodoList,
          {
            id: 99999,
            name,
            isCompleted: false,
          },
        ]
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo-list"] });
    },
  });

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutate(formData);
    e.currentTarget.reset();
  };

  return (
    <form className="flex w-full max-w-300 gap-4" onSubmit={handleSubmit}>
      <AddTodoInput name="name" disabled={isPending} />
      <TodoButton actionType="add" disabled={isPending} />
    </form>
  );
}
