export interface Todo {
  id: number;
  name: string;
  isCompleted: boolean;
  imageUrl?: string | null;
}

export interface CreateTodoRequest {
  name: string;
}

export interface UpdateTodoRequest {
  name?: string;
  isCompleted?: boolean;
  imageUrl?: string | null;
}
