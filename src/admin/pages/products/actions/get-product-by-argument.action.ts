import { leChatonApi } from '../../../../api/leChatonApi';
import type { ProductsApiResponse } from '../interfaces/products-api-response.interface';

interface Options {
  limit?: number | string;
  id?: string;
  slug?: string;
  title?: string;
}

export const getProductByArgumentAction = async (
  options: Options,
): Promise<ProductsApiResponse> => {
  const { limit, id, slug, title } = options;
  const { data } = await leChatonApi.get<ProductsApiResponse>('/api/products', {
    params: {
      limit,
      id,
      slug,
      title,
    },
  });

  const productsWithImages = data.products.map((product) => ({
    ...product,
    image: `${import.meta.env.VITE_API_URL}${product.image}`,
  }));

  if (id) {
    const filteredProducts = productsWithImages.filter((product) =>
      product?.id.includes(id),
    );
    return {
      ...data,
      limit: 1000,
      products: filteredProducts,
    };
  }

  if (slug) {
    const filteredProducts = productsWithImages.filter(
      (product) => product?.slug === slug,
    );
    return {
      ...data,
      limit: 1000,
      products: filteredProducts,
    };
  }

  if (title) {
    const filteredProducts = productsWithImages.filter((product) =>
      product?.title.toLowerCase().includes(title.toLowerCase()),
    );
    return {
      ...data,
      limit: 1000,
      products: filteredProducts,
    };
  }

  return {
    ...data,
    products: productsWithImages,
  };
};
