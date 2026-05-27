import { useQuery } from '@tanstack/react-query';
import { getOrdersByActionLogAction } from '../actions/get-orders-by-action-log.action';

export const useOrdersByAction = () => {
  return useQuery({
    queryKey: ['ordersByAction'],
    queryFn: () => getOrdersByActionLogAction(),
    staleTime: 1000 * 60 * 5,
  });
};
