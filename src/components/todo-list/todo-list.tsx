import { TodoItem } from "@/types/todo-items";

import { TodoCheckbox } from "./todo-checkbox";

type TodoListProps = Pick<TodoItem, "id" | "name" | "isCompleted">;

export function TodoList({ id, name, isCompleted }: TodoListProps) {
  return (
    <div className="group flex w-full items-center gap-4 rounded-full px-3 py-2 outline-2 outline-slate-900 has-checked:bg-violet-100">
      <TodoCheckbox id={id} isCompleted={isCompleted} />
      <label
        htmlFor={id.toString()}
        className="cursor-pointer text-base font-normal group-has-checked:line-through"
      >
        {name}
      </label>
    </div>
  );
}
