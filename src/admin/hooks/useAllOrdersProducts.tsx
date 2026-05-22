import { useQuery } from '@tanstack/react-query';
import { getAllOrdersProductsAction } from '../actions/get-all-orders-products.action';

export const useAllOrdersProducts = () => {
  return useQuery({
    queryKey: ['productsOrders'],
    queryFn: () => getAllOrdersProductsAction(),
    staleTime: 1000 * 60 * 5,
  });
};
