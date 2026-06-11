import { leChatonApi } from '../../../../api/leChatonApi';
import type { OrdersByAction } from '../interfaces/orders-by-action.interface';

export const getOrdersByActionLogAction = async (): Promise<
  OrdersByAction[]
> => {
  const { data } = await leChatonApi.get<OrdersByAction[]>(
    '/api/notifications/orders-by-action',
  );

  return data;
};
