import { useQuery } from '@tanstack/react-query';
import { getOrdersAction } from '../actions/get-orders.action';
import { useSearchParams } from 'react-router';

export const useOrders = (maxLimit?: number) => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;
  const limit = searchParams.get('limit') || 9;

  return useQuery({
    queryKey: [
      'orders',
      {
        page,
        limit: maxLimit ?? limit,
      },
    ],
    queryFn: () =>
      getOrdersAction({
        page,
        limit: maxLimit ?? (isNaN(+limit) ? 9 : limit),
      }),
    staleTime: 1000 * 60 * 5,
  });
};
