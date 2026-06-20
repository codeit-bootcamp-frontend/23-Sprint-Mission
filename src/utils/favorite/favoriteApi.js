import { addFavoriteProduct } from '../../apis/product/addFavoriteProduct';
import { removeFavoriteProduct } from '../../apis/product/removeFavoriteProduct';

export const toggleFavoriteApi = async (product) => {
  if (product.isFavorite) {
    return await removeFavoriteProduct(product.id);
  }
  return await addFavoriteProduct(product.id);
};
