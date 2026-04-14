"use server";

import { TodoListType } from "@/libs/types/api";
import { revalidatePath } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getTodoList = async (): Promise<TodoListType[]> => {
  try {
    const response = await fetch(`${BASE_URL}/items`);

    if (!response.ok) {
      throw new Error("todo 데이터를 불러오는데 실패했습니다.");
    }

    return await response.json();
  } catch (error) {
    console.error("todo 가져오기 에러:", error);
    return [];
  }
};

export const addTodo = async (formData: FormData) => {
  const name = formData.get("todo") as string;

  if (!name || !name.trim()) return;

  try {
    const response = await fetch(`${BASE_URL}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim() }),
    });

    if (response.ok) {
      revalidatePath("/");
    }
  } catch (error) {
    console.error("투두 추가하기 에러:", error);
  }
};
