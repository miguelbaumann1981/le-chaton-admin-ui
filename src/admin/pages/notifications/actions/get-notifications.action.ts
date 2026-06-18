import { leChatonApi } from '../../../../api/leChatonApi';
import type { ActionNotification } from '../../dashboard/types/notification-action.type';
import type { NotificationsApiResponse } from '../interfaces/notifications-api-response.interface';

interface Options {
  page?: number | string;
  limit?: number | string;
  action?: ActionNotification;
}

export const getNotificationsAction = async (
  options: Options,
): Promise<NotificationsApiResponse> => {
  const { page, limit, action } = options;

  const { data } = await leChatonApi.get<NotificationsApiResponse>(
    '/api/notifications',
    {
      params: {
        page,
        limit,
        action,
      },
    },
  );

  if (action !== null) {
    const filteredOrders = data.logs.filter((log) => log.action === action);
    return {
      ...data,
      total: filteredOrders.length,
      logs: filteredOrders,
    };
  }

  return data;
};
