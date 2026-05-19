export const updateProductList = (list, targetId, updatedData) => {
  return list.map((item) => (item.id === targetId ? updatedData : item));
};
