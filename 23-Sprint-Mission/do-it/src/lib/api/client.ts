import { TENANT_ID } from "@/constants/tenant";

const BASE_URL = `https://assignment-todolist-api.vercel.app/api/${TENANT_ID}`;

export async function request<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "요청에 실패했습니다.");
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}
