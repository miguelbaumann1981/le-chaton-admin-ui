import { leChatonApi } from '../../../../api/leChatonApi';
import type { NotificationLog } from '../interfaces/notification-log.interface';

export const getLatestNotificationsAction = async (
  limit: number,
): Promise<NotificationLog[]> => {
  const { data } = await leChatonApi.get<NotificationLog[]>(
    '/api/notifications/latest',
    {
      params: {
        limit,
      },
    },
  );

  return data;
};
