const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function request<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  if (!BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL 환경 변수가 설정되지 않았습니다.");
  }

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
