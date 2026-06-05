import { useQuery } from '@tanstack/react-query';
import { getProductById } from '../actions/get-products.action';

export const useProductById = (id: string) => {
  return useQuery({
    queryKey: ['product by ID', id],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return getProductById(id);
    },
    staleTime: 1000 * 60 * 5,
  });
};
