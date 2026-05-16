export interface Todo {
  id: number;
  name: string;
  isCompleted: boolean;
  memo?: string | null;
  imageUrl?: string | null;
}

export interface CreateTodoRequest {
  name: string;
}

export interface UpdateTodoRequest {
  name?: string;
  isCompleted?: boolean;
  memo?: string;
  imageUrl?: string;
}

export interface UploadImageResponse {
  url: string;
}
