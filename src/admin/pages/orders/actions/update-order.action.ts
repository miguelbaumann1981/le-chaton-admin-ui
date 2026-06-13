import { leChatonApi } from '../../../../api/leChatonApi';
import type { Order } from '../interfaces/order.interface';

export const updateOrderAction = async (
  id: string,
  body: Partial<Order>,
): Promise<Order | null> => {
  // return early when id is empty or body has no properties
  if (id === '') return null;

  const { data } = await leChatonApi.put<Order>(`/api/orders/${id}`, body);

  return data;
};
