import { TodoListType } from "@/libs/types/api";

import TodoSection from "@/components/todo/TodoSection";
import TodoItemList from "@/components/todo/TodoItemList";

interface TodoListProps {
  todoList: TodoListType[];
}

export default function TodoList({ todoList }: TodoListProps) {
  const todoTasks = todoList.filter((todo) => !todo.isCompleted);
  const doneTasks = todoList.filter((todo) => todo.isCompleted);

  return (
    <div className="grid grid-cols-2 gap-6 w-full">
      <TodoSection type="todo">
        <TodoItemList tasks={todoTasks} type="todo" />
      </TodoSection>

      <TodoSection type="done">
        <TodoItemList tasks={doneTasks} type="done" />
      </TodoSection>
    </div>
  );
}
