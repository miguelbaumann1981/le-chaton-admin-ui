import type { ActionNotification } from '../types/notification-action.type';

export interface NotificationLog {
  id: string;
  action: ActionNotification;
  message?: string;
  createdAt: string;
  userId?: string;
  orderId?: string;
}
