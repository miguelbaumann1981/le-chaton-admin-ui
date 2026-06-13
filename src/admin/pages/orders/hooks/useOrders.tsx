import { useQuery } from '@tanstack/react-query';
import { getOrdersAction } from '../actions/get-orders.action';
import { useSearchParams } from 'react-router';
import type { OrderStatus } from '../types/order-status.type';

export const useOrders = (customLimit: number, customState: OrderStatus) => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;
  const limit = searchParams.get('limit') || customLimit;

  return useQuery({
    queryKey: [
      'orders',
      {
        page,
        limit,
        state: customState,
      },
    ],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return getOrdersAction({
        page,
        limit,
        state: customState,
      });
    },
    staleTime: 1000 * 60 * 5,
  });
};
