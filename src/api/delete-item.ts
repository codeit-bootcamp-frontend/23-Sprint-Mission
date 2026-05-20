import CodeitInstance from '@/src/lib/codeit-instance';

interface DeleteItemResponse {
  message: string;
}

export default async function deleteItem(
  itemId: number,
): Promise<DeleteItemResponse> {
  try {
    const res = await CodeitInstance.delete(`/items/${itemId}`);
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
