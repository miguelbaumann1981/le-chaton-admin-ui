import { useQuery } from '@tanstack/react-query';
import { getProductBySlug } from '../actions/get-product-by-slug.action';

export const useProductBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['product by slug', slug],
    queryFn: () => getProductBySlug(slug),
    staleTime: 1000 * 60 * 5,
  });
};
