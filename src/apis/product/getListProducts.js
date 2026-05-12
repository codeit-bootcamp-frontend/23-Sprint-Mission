import instance from '../instance';

export const getListProducts = async ({
  page = 1,
  pageSize = 10,
  orderBy = 'favorite',
  keyword,
} = {}) => {
  const params = {
    page,
    pageSize,
    orderBy,
  };

  if (keyword) {
    params.keyword = keyword;
  }

  const { data } = await instance.get('/products', {
    params,
  });
  return data;
};
