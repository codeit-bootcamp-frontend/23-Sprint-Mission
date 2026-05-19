export interface TodoItem {
  id: number;
  tenantId: string;
  name: string;
  memo: string | null;
  imageUrl: string | null;
  isCompleted: boolean;
}

export type RequestCreateTodoItem = Pick<TodoItem, "name">;
export type ResponseCreateTodoItem = TodoItem;

export type ResponseGetTodoItems = Pick<
  TodoItem,
  "id" | "name" | "isCompleted"
>[];

export type ResponseGetTodoItem = TodoItem;

export type RequestPatchTodoItem = Partial<Omit<TodoItem, "tenantId" | "id">>;
export type ResponsePatchTodoItem = TodoItem;

export interface ResponseDeleteTodoItem {
  message: string;
}

export interface RequestPostTodoImage {
  image: File; // multipart/form-data의 image 필드 (Max 5MB)
}
export interface ResponsePostTodoImage {
  url: string;
}
