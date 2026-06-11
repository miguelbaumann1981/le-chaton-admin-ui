import { useQuery } from '@tanstack/react-query';
import { getOrdersPriceDateAction } from '../actions/get-orders-price-date.action.';

export const useOrdersPriceDate = () => {
  return useQuery({
    queryKey: ['priceDateOrders'],
    queryFn: () => getOrdersPriceDateAction(),
    staleTime: 1000 * 60 * 5,
  });
};
