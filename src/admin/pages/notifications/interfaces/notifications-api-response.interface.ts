import type { NotificationLog } from '../../dashboard/interfaces/notification-log.interface';

export interface NotificationsApiResponse {
  page: number;
  limit: number;
  total: number;
  next: string | null;
  previous: string | null;
  logs: NotificationLog[];
}
