import { getBaseUrl, request } from "./client";
import type {
  CreateTodoRequest,
  Todo,
  UpdateTodoRequest,
  UploadImageResponse,
} from "@/types/todo";

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

export async function getTodo(itemId: number): Promise<Todo> {
  return request<Todo>(`/items/${itemId}`, {
    method: "GET",
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

export async function deleteTodo(itemId: number): Promise<Todo> {
  return request<Todo>(`/items/${itemId}`, {
    method: "DELETE",
  });
}

export async function uploadImage(file: File): Promise<UploadImageResponse> {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${getBaseUrl()}/images/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "이미지 업로드에 실패했습니다.");
  }

  return response.json();
}
