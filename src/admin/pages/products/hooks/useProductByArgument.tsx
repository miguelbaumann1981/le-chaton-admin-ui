import { useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getProductByArgumentAction } from '../actions/get-product-by-argument.action';

export const useProductByArgument = (
  id?: string,
  slug?: string,
  title?: string,
) => {
  const [searchParams] = useSearchParams();
  const limit = searchParams.get('limit') || 1000;

  return useQuery({
    queryKey: [
      'products',
      {
        limit,
        id,
        slug,
        title,
      },
    ],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return getProductByArgumentAction({
        limit,
        id,
        slug,
        title,
      });
    },
    staleTime: 1000 * 60 * 5,
  });
};
