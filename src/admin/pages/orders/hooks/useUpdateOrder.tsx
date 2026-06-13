import { useQuery } from '@tanstack/react-query';
import { updateOrderAction } from '../actions/update-order.action';
import type { Order } from '../interfaces/order.interface';

export const useUpdateOrder = (id: string, body: Partial<Order>) => {
  return useQuery({
    queryKey: ['update order', id],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return updateOrderAction(id, body);
    },

    staleTime: 1000 * 60 * 5,
  });
};
