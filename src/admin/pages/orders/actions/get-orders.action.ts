import { leChatonApi } from '../../../../api/leChatonApi';
import type { OrdersApiResponse } from '../interfaces/orders-api-response.interface';
import type { OrderStatus } from '../types/order-status.type';

interface Options {
  page?: number | string;
  limit?: number | string;
  state?: OrderStatus;
}

export const getOrdersAction = async (
  options: Options,
): Promise<OrdersApiResponse> => {
  const { page, limit, state } = options;

  const { data } = await leChatonApi.get<OrdersApiResponse>('/api/orders', {
    params: {
      page,
      limit,
      state,
    },
  });

  if (state !== null) {
    const filteredOrders = data.orders.filter(
      (order) => order.status === state,
    );
    return {
      ...data,
      total: filteredOrders.length,
      orders: filteredOrders,
    };
  }

  return data;
};
