const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface GetArticlesParams {
  pageSize?: number;
  orderBy?: "recent" | "like";
  page?: number;
}

export const getArticles = async ({
  pageSize = 10,
  orderBy = "recent",
  page = 1,
}: GetArticlesParams = {}) => {
  const params = new URLSearchParams({
    pageSize: pageSize.toString(),
    orderBy: orderBy,
    page: page.toString(),
  });

  const res = await fetch(`${BASE_URL}/articles?${params.toString()}`);

  if (!res.ok) {
    throw new Error("데이터를 불러오는 데 실패했습니다.");
  }

  return res.json();
};
