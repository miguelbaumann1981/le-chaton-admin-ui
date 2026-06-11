import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import { getOrderByAgument } from '../actions/get-order-by-argument';

export const useOrderByArgument = (
  id?: string,
  date?: string,
  name?: string,
) => {
  const [searchParams] = useSearchParams();
  const limit = searchParams.get('limit') || 1000;

  return useQuery({
    queryKey: [
      'orders',
      {
        limit,
        id,
        date,
        name,
      },
    ],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return getOrderByAgument({
        limit,
        id,
        date,
        name,
      });
    },

    staleTime: 1000 * 60 * 5,
  });
};
