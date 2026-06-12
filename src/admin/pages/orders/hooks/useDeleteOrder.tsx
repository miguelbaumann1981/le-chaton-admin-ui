import { useQuery } from '@tanstack/react-query';
import { getDeleteOrderAction } from '../actions/get-delete-order.action';

export const useDeleteOrder = (id: string) => {
  return useQuery({
    queryKey: ['delete order', id],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return getDeleteOrderAction(id);
    },
    staleTime: 1000 * 60 * 5,
  });
};
