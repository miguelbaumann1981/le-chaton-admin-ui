import { leChatonApi } from '../../../../api/leChatonApi';
import type { NotificationLog } from '../../dashboard/interfaces/notification-log.interface';

export const deleteNotificationAction = async (
  id: string,
): Promise<NotificationLog | null> => {
  if (id === '') return null;

  const { data } = await leChatonApi.delete<NotificationLog>(
    `/api/notifications/${id}`,
  );

  return data;
};
