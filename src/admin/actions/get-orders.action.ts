import { leChatonApi } from '../../api/leChatonApi';
import type { OrdersApiResponse } from '../interfaces/orders-api-response.interface';

interface Options {
  page?: number | string;
  limit?: number | string;
}

export const getOrdersAction = async (
  options: Options,
): Promise<OrdersApiResponse> => {
  const { page, limit } = options;

  const { data } = await leChatonApi.get<OrdersApiResponse>('/api/orders', {
    params: {
      page,
      limit,
    },
  });

  return data;
};
