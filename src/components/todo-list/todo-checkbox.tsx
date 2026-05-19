"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toggleTodoItem } from "@/action/item";
import { ReactComponent as CheckedIcon } from "@/assets/images/is-checked.svg";
import { ResponseGetTodoItems, TodoItem } from "@/types/todo-items";

type TodoCheckboxProps = Pick<TodoItem, "id" | "isCompleted">;

export function TodoCheckbox({ id, isCompleted }: TodoCheckboxProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => toggleTodoItem(id, !isCompleted),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["todo-list"] });

      const previousTodoList = queryClient.getQueryData<ResponseGetTodoItems>([
        "todo-list",
      ]);

      if (previousTodoList) {
        queryClient.setQueryData<ResponseGetTodoItems>(
          ["todo-list"],
          previousTodoList.map((item) =>
            item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
          )
        );
      }

      return { previousTodoList };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo-list"] });
    },
  });

  const handleChange = () => {
    mutate();
  };

  return (
    <div className="relative flex cursor-pointer items-center">
      <input
        type="checkbox"
        className="peer h-8 w-8 cursor-pointer appearance-none rounded-full border-slate-900 bg-yellow-50 outline-2 checked:bg-violet-600 checked:outline-0"
        id={id.toString()}
        checked={isCompleted}
        onChange={handleChange}
        disabled={isPending}
      />
      <span className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-yellow-50 opacity-0 peer-checked:opacity-100">
        <CheckedIcon />
      </span>
    </div>
  );
}
