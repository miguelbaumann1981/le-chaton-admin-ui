import { leChatonApi } from '../../api/leChatonApi';
import type { LatestOrdersApiResponse } from '../interfaces/latest-orders-api-response.interface';

export const getLatestOrdersAction = async (
  limit: number,
): Promise<LatestOrdersApiResponse> => {
  const { data } = await leChatonApi.get<LatestOrdersApiResponse>(
    '/orders/latest',
    {
      params: {
        limit,
      },
    },
  );

  return {
    ...data,
    orders: data.orders,
  };
};
