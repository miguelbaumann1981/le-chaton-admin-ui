import { useQuery } from '@tanstack/react-query';
import { getOrderByIdAction } from '../actions/get-order-by-id.action';

export const useOrderById = (id: string) => {
  return useQuery({
    queryKey: ['order by ID', id],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return getOrderByIdAction(id);
    },
    staleTime: 1000 * 60 * 5,
  });
};
