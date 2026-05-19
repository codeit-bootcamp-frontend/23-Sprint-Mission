type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

async function request<T>(
  path: string,
  method: HttpMethod = "GET",
  body?: unknown
): Promise<T> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    throw new Error(`[${method} ${path}] ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export const http = {
  get: <T>(path: string) => request<T>(path, "GET"),
  post: <T>(path: string, body: unknown) => request<T>(path, "POST", body),
  patch: <T>(path: string, body: unknown) => request<T>(path, "PATCH", body),
  delete: <T>(path: string) => request<T>(path, "DELETE"),
};
