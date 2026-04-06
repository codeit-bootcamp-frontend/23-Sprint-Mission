import { request } from "./client";
import type { CreateTodoRequest, Todo, UpdateTodoRequest } from "@/types/todo";

export async function getTodos(): Promise<Todo[]> {
  return request<Todo[]>("/items", {
    method: "GET",
  });
}

export async function createTodo(body: CreateTodoRequest): Promise<Todo> {
  return request<Todo>("/items", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function updateTodo(
  itemId: number,
  body: UpdateTodoRequest,
): Promise<Todo> {
  return request<Todo>(`/items/${itemId}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}
