import { leChatonApi } from '../../api/leChatonApi';
import type { OrdersPriceDate } from '../interfaces/orders-price-date.inteface';

export const getOrdersPriceDateAction = async (): Promise<
  OrdersPriceDate[]
> => {
  const { data } =
    await leChatonApi.get<OrdersPriceDate[]>('/orders/price-date');

  return data;
};
