import type { ActionNotification } from '../types/notification-action.type';

export const useNotificationColor = (action: ActionNotification): string => {
  switch (action) {
    case 'REGISTRATION':
      return 'text-warning';
    case 'LOGIN':
      return 'text-primary';
    case 'CREATE':
      return 'text-success';
    case 'DELETE':
      return 'text-error';
    case 'UPDATE':
      return 'text-info';
  }
  return '';
};
