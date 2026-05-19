// src/api/items.ts
import {
  RequestCreateTodoItem,
  RequestPatchTodoItem,
  ResponseCreateTodoItem,
  ResponseDeleteTodoItem,
  ResponseGetTodoItem,
  ResponseGetTodoItems,
  ResponsePatchTodoItem,
} from "@/types/todo-items";

import { http } from "./fetch";

export const itemsApi = {
  getAll: () => http.get<ResponseGetTodoItems>(`items`),

  getOne: (itemId: number) => http.get<ResponseGetTodoItem>(`items/${itemId}`),

  create: (body: RequestCreateTodoItem) =>
    http.post<ResponseCreateTodoItem>("items", body),

  update: (itemId: number, body: RequestPatchTodoItem) =>
    http.patch<ResponsePatchTodoItem>(`items/${itemId}`, body),

  delete: (itemId: number) =>
    http.delete<ResponseDeleteTodoItem>(`items/${itemId}`),
};
