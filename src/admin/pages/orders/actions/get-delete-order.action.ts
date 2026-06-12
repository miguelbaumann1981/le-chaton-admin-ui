import { leChatonApi } from '../../../../api/leChatonApi';
import type { Order } from '../interfaces/order.interface';

export const getDeleteOrderAction = async (
  id: string,
): Promise<Order | null> => {
  if (id === '') return null;

  const { data } = await leChatonApi.delete<Order>(`/api/orders/${id}`);

  return data;
};
