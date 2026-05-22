import { leChatonApi } from '../../api/leChatonApi';
import type { LatestOrdersApiResponse } from '../interfaces/latest-orders-api-response.interface';

export const getLatestOrdersAction =
  async (): Promise<LatestOrdersApiResponse> => {
    const { data } =
      await leChatonApi.get<LatestOrdersApiResponse>('/orders/latest');

    return {
      ...data,
      orders: data.orders.slice(0, 3),
    };
  };
