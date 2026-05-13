import CodeitInstance from "@/src/lib/codeit-instance";

interface CreateItemRequestBody {
  name: string;
}

interface CreateItemResponse {
  id: number;
  tenantId: string;
  name: string;
  memo: string;
  imageUrl: string;
  isCompleted: boolean;
}

export default async function createItem({
  name,
}: CreateItemRequestBody): Promise<CreateItemResponse> {
  try {
    const res = await CodeitInstance.post('/items', {
      name,
    });
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}