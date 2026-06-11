import { useI18n } from '../../../../i18n';
import type { ActionNotification } from '../types/notification-action.type';

export const useNotificationActionText = (
  action: ActionNotification,
): string => {
  const { t } = useI18n();

  switch (action) {
    case 'REGISTRATION':
      return t('notifications.registration');
    case 'LOGIN':
      return t('notifications.login');
    case 'CREATE':
      return t('notifications.create');
    case 'DELETE':
      return t('notifications.delete');
    case 'UPDATE':
      return t('notifications.update');
  }
};
