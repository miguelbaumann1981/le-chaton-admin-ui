import { useQuery } from '@tanstack/react-query';
import { getLatestOrdersAction } from '../actions/get-latest-orders.action';

export const useLatestOrders = () => {
  return useQuery({
    queryKey: ['latestOrders'],
    queryFn: () => getLatestOrdersAction(),
    staleTime: 1000 * 60 * 5,
  });
};
