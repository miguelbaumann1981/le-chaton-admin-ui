import { useQuery } from '@tanstack/react-query';
import { getOrderByIdAction } from '../actions/get-order-by-id.action';

export const useOrderById = (id: string) => {
  return useQuery({
    queryKey: ['order by ID', id],
    queryFn: () => getOrderByIdAction(id),
    staleTime: 1000 * 60 * 5,
  });
};
