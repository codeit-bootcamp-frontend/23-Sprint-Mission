import { TodoListType } from "@/libs/types/api";
import TodoItem from "./TodoItem";
import TodoEmpty from "./TodoEmpty";

interface TodoItemListProps {
  tasks: TodoListType[];
  type: "todo" | "done";
}

export default async function TodoItemList({ tasks, type }: TodoItemListProps) {
  if (tasks.length === 0) {
    return <TodoEmpty type={type} />;
  }

  return (
    <ul className="flex flex-col gap-2">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          id={task.id}
          name={task.name}
          isCompleted={task.isCompleted}
        />
      ))}
    </ul>
  );
}
