import CodeitInstance from "@/src/lib/codeit-instance";

interface GetItemsRequest {
  page?: number;
  pageSize?: number;
}

interface Item {
  isCompleted: boolean;
  name: string;
  id: number;
}

type GetItemsResponse = Item[];

export default async function getItems({
  page = 1,
  pageSize = 10,
}: GetItemsRequest): Promise<GetItemsResponse> {
  try {
    const res = await CodeitInstance.get('/items', {
      params: {
        page,
        pageSize,
      },
    });
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
