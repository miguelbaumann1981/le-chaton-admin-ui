import { leChatonApi } from '../../../../api/leChatonApi';
import type { OrdersApiResponse } from '../interfaces/orders-api-response.interface';

interface Options {
  limit?: number | string;
  id?: string;
  date?: string;
  name?: string;
}

export const getOrderByAgument = async (
  options: Options,
): Promise<OrdersApiResponse> => {
  const { limit, id, date, name } = options;

  const { data } = await leChatonApi.get<OrdersApiResponse>('/api/orders', {
    params: {
      limit,
      id,
      date,
      name,
    },
  });

  if (id) {
    const filteredOrders = data?.orders.filter((order) =>
      order?.id.includes(id),
    );
    return {
      ...data,
      limit: 1000,
      orders: filteredOrders,
    };
  }

  if (date) {
    const filteredOrders = data?.orders.filter((order) =>
      String(order?.orderDate ?? '').includes(String(date)),
    );
    return {
      ...data,
      limit: 1000,
      orders: filteredOrders,
    };
  }

  if (name) {
    const filteredOrders = data?.orders.filter((order) =>
      order?.description.toLowerCase().includes(name.toLowerCase()),
    );
    return {
      ...data,
      limit: 1000,
      orders: filteredOrders,
    };
  }

  return data;
};
