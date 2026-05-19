"use server";
import { itemsApi } from "@/api/todo-items";

export async function postTodoItem(formData: FormData) {
  const name = String(formData.get("name"));
  if (name.length === 0) return;
  await itemsApi.create({ name });
}

export async function toggleTodoItem(id: number, isCompleted: boolean) {
  await itemsApi.update(id, { isCompleted });
}
