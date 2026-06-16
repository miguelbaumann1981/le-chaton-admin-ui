import { leChatonApi } from '../../../../api/leChatonApi';
import type { ActionNotification } from '../../dashboard/types/notification-action.type';
import type { NotificationsApiResponse } from '../interfaces/notifications-api-response.interface';

interface Options {
  page?: number | string;
  limit?: number | string;
  notification?: ActionNotification;
}

export const getNotificationsAction = async (
  options: Options,
): Promise<NotificationsApiResponse> => {
  const { page, limit, notification } = options;

  const { data } = await leChatonApi.get<NotificationsApiResponse>(
    '/api/notifications',
    {
      params: {
        page,
        limit,
        notification,
      },
    },
  );

  if (notification !== null) {
    const filteredOrders = data.logs.filter(
      (log) => log.action === notification,
    );
    return {
      ...data,
      total: filteredOrders.length,
      logs: filteredOrders,
    };
  }

  return data;
};
