import instance from '../instance';

export const uploadImage = async (imageFile) => {
  const formData = new FormData();

  formData.append('image', imageFile);

  const { data } = await instance.post('/images/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};
