import { leChatonApi } from '../../../../api/leChatonApi';
import type { Order } from '../interfaces/order.interface';

export const updateOrderAction = async (
  id: string,
  body: Partial<Order>,
): Promise<Order | null> => {
  if (id === '') return null;

  const { data } = await leChatonApi.put<Order>(`/api/orders/${id}`, body);

  return data;
};
