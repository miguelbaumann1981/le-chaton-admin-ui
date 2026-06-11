import type { ActionNotification } from '../types/notification-action.type';

export interface OrdersByAction {
  action: ActionNotification;
  count: number;
}
