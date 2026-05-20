import instance from '../instance';

export const getMyProfile = async () => {
  const { data } = await instance.get('/users/me');

  return data;
};
