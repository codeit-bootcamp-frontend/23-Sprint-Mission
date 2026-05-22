import CodeitInstance from '@/src/lib/codeit-instance';

interface UploadImageResponse {
  url: string;
}

export default async function uploadImage(
  image: File,
): Promise<UploadImageResponse> {
  try {
    const formData = new FormData();
    formData.append('image', image);

    const res = await CodeitInstance.post(`/images/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
