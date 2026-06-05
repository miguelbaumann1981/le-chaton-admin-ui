import { leChatonApi } from '../../../../api/leChatonApi';
import type {
  Product,
  ProductsApiResponse,
} from '../interfaces/products-api-response.interface';
import type { Category } from '../types/category.type';

interface Options {
  page?: number | string;
  limit?: number | string;
  category?: Category | string;
}

export const getProductsAction = async (
  options: Options,
): Promise<ProductsApiResponse> => {
  const { page, limit, category } = options;

  const { data } = await leChatonApi.get<ProductsApiResponse>('/api/products', {
    params: {
      page,
      limit,
      category,
    },
  });

  const productsWithImages = data.products.map((product) => ({
    ...product,
    image: `${import.meta.env.VITE_API_URL}${product.image}`,
  }));

  return {
    ...data,
    products: productsWithImages,
  };
};

export const getProductById = async (id: string): Promise<Product[]> => {
  const { data } = await leChatonApi.get<ProductsApiResponse>(`/api/products`);

  const productById = data.products.filter((product) =>
    product?.id.includes(id),
  );
  const productByIdWithImage = productById.map((product) => ({
    ...product,
    image: `${import.meta.env.VITE_API_URL}${product.image}`,
  }));

  return productByIdWithImage;
};
