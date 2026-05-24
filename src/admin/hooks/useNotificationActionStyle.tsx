import type { ActionNotification } from '../types/notification-action.type';

export const useNotificationActionStyle = (
  action: ActionNotification,
): string => {
  switch (action) {
    case 'REGISTRATION':
      return 'badge-warning';
    case 'LOGIN':
      return 'badge-primary';
    case 'CREATE':
      return 'badge-success';
    case 'DELETE':
      return 'badge-error';
    case 'UPDATE':
      return 'badge-info';
  }
};
