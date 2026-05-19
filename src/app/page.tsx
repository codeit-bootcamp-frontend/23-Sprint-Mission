"use client";
import { useQuery } from "@tanstack/react-query";

import { itemsApi } from "@/api/todo-items";
import { AddTodoItemBar } from "@/components/add-todo/add-todo-item-bar";
import { TodoListWrapper } from "@/components/todo-list/todo-list-wrapper";

export default function TodoListPage() {
  const result = useQuery({
    queryKey: ["todo-list"],
    queryFn: () => itemsApi.getAll(),
    select: (data) => ({
      todoList: data.filter((item) => !item.isCompleted),
      doneList: data.filter((item) => item.isCompleted),
    }),
  });

  const todoList = result.data?.todoList || [];
  const doneList = result.data?.doneList || [];

  return (
    <div className="mx-10 flex flex-col items-center justify-center gap-10 py-6">
      <AddTodoItemBar />
      <div className="flex w-full max-w-300 gap-6">
        <TodoListWrapper type="todo" list={todoList} />
        <TodoListWrapper type="done" list={doneList} />
      </div>
    </div>
  );
}
