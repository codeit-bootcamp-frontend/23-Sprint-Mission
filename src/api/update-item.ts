import CodeitInstance from "@/src/lib/codeit-instance";

interface UpdateItemRequestBody {
  name?: string;
  memo?: string;
  imageUrl?: string;
  isCompleted?: boolean;
}

interface UpdateItemResponse {
  id: number;
  tenantId: string;
  name: string;
  memo: string;
  imageUrl: string;
  isCompleted: boolean;
}

export default async function updateItem(
  itemId: number,
  {
    name,
    memo,
    imageUrl,
    isCompleted,
}: UpdateItemRequestBody): Promise<UpdateItemResponse> {
  try {
    const res = await CodeitInstance.patch(`/items/${itemId}`, {
      name,
      memo,
      imageUrl,
      isCompleted,
    });
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}