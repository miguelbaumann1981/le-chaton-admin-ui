import { useQuery } from '@tanstack/react-query';
import { getProductBySlug } from '../actions/get-product-by-slug.action';

export const useProductById = (slug: string) => {
  return useQuery({
    queryKey: ['product by slug', slug],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return getProductBySlug(slug);
    },
    staleTime: 1000 * 60 * 5,
  });
};
