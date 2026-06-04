import { leChatonApi } from '../../../../api/leChatonApi';
import type { ProductsApiResponse } from '../interfaces/products-api-response.interface';

interface Options {
  page?: number | string;
  limit?: number | string;
}

export const getProductsAction = async (
  options: Options,
): Promise<ProductsApiResponse> => {
  const { page, limit } = options;

  const { data } = await leChatonApi.get<ProductsApiResponse>('/api/products', {
    params: {
      page,
      limit,
    },
  });

  // const productsByLang = data.products.filter(
  //   (product) => product.language === 'en',
  // );

  const productsWithImages = data.products.map((product) => ({
    ...product,
    image: `${import.meta.env.VITE_API_URL}${product.image}`,
  }));

  return {
    ...data,
    products: productsWithImages,
  };
};
