import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import { getOrderByAgumentAction } from '../actions/get-order-by-argument.action';

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
    queryFn: () =>
      getOrderByAgumentAction({
        limit,
        id,
        date,
        name,
      }),
    staleTime: 1000 * 60 * 5,
  });
};
