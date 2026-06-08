import { leChatonApi } from '../../../../api/leChatonApi';
import type { Product } from '../interfaces/products-api-response.interface';

export const getProductBySlug = async (slug: string): Promise<Product> => {
  const { data } = await leChatonApi.get<Product>(`/api/products/${slug}`);

  return {
    ...data,
    image: `${import.meta.env.VITE_API_URL}${data.image}`,
  };
};
