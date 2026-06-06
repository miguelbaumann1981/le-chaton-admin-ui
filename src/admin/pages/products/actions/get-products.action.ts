import { leChatonApi } from '../../../../api/leChatonApi';
import type {
  Product,
  ProductsApiResponse,
} from '../interfaces/products-api-response.interface';
import type { Category } from '../types/category.type';
import type { Language } from '../types/language.type';

interface Options {
  page?: number | string;
  limit?: number | string;
  category?: Category | string;
  language?: Language;
}

export const getProductsAction = async (
  options: Options,
): Promise<ProductsApiResponse> => {
  const { page, limit, category, language } = options;

  const { data } = await leChatonApi.get<ProductsApiResponse>('/api/products', {
    params: {
      page,
      limit,
      category,
      language,
    },
  });

  const productsWithImages = data.products.map((product) => ({
    ...product,
    image: `${import.meta.env.VITE_API_URL}${product.image}`,
  }));

  if (language) {
    const filteredProducts = productsWithImages.filter(
      (product) => product.language === language,
    );
    return {
      ...data,
      total: filteredProducts.length,
      products: filteredProducts,
    };
  }

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
