import { leChatonApi } from '../../../../api/leChatonApi';
import type { Order } from '../interfaces/order.interface';

export const getOrderByIdAction = async (id: string): Promise<Order | null> => {
  if (id === '') return null;

  const { data } = await leChatonApi.get<Order>(`/api/orders/order/${id}`);

  return data;
};
