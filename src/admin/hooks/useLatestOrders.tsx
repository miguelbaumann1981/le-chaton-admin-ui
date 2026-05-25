import { useQuery } from '@tanstack/react-query';
import { getLatestOrdersAction } from '../actions/get-latest-orders.action';

export const useLatestOrders = (limit: number) => {
  return useQuery({
    queryKey: ['latestOrders'],
    queryFn: () => getLatestOrdersAction(limit),
    staleTime: 1000 * 60 * 5,
  });
};
