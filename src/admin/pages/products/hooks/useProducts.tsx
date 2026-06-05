import { useSearchParams } from 'react-router';
import { getProductsAction } from '../actions/get-products.action';
import { useQuery } from '@tanstack/react-query';

export const useProducts = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;
  const limit = searchParams.get('limit') || 7;
  const category = searchParams.get('category') || '';

  return useQuery({
    queryKey: [
      'products',
      {
        page,
        limit,
        category,
      },
    ],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return getProductsAction({
        page,
        limit,
        category,
      });
    },
    staleTime: 1000 * 60 * 5,
  });
};
