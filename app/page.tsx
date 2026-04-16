import { getTodoList } from "@/libs/actions/todo";

import SearchForm from "@/components/todo/SearchForm";
import TodoList from "@/components/todo/TodoList";

export default async function Home() {
  const todoList = await getTodoList();

  return (
    <div className="space-y-8">
      <SearchForm />
      <TodoList todoList={todoList} />
    </div>
  );
}
