import CodeitInstance from '@/src/lib/codeit-instance';

interface GetItemDetailResponse {
  id: number;
  tenantId: string;
  name: string;
  memo: string;
  imageUrl: string;
  isCompleted: boolean;
}

export default async function getItemDetail(
  itemId: number,
): Promise<GetItemDetailResponse> {
  try {
    const res = await CodeitInstance.get(`/items/${itemId}`);
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
