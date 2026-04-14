// src/components/todo/TodoItemList.tsx
import TodoItem from "./TodoItem";
import TodoEmpty from "./TodoEmpty";
import { TodoListType } from "@/libs/types/api";

interface TodoItemListProps {
  tasks: TodoListType[];
  type: "todo" | "done";
}

export default function TodoItemList({ tasks, type }: TodoItemListProps) {
  if (tasks.length === 0) {
    return <TodoEmpty type={type} />;
  }

  return (
    <ul className="flex flex-col gap-2">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          text={task.name}
          isCompleted={task.isCompleted}
        />
      ))}
    </ul>
  );
}
