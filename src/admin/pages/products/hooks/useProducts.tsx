import { useSearchParams } from 'react-router';
import { getProductsAction } from '../actions/get-products.action';
import { useQuery } from '@tanstack/react-query';

export const useProducts = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;
  const limit = searchParams.get('limit') || 9;

  return useQuery({
    queryKey: [
      'products',
      {
        page,
        limit,
      },
    ],
    queryFn: () =>
      getProductsAction({
        page,
        limit,
      }),
    staleTime: 1000 * 60 * 5,
  });
};
