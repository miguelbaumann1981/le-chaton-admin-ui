import { useI18n } from '../../i18n';
import type { ActionNotification } from '../types/notification-action.type';

export const useNotificationActionDescription = (
  action: ActionNotification,
): string => {
  const { t } = useI18n();

  switch (action) {
    case 'REGISTRATION':
      return t('notifications.registrationDescription');
    case 'LOGIN':
      return t('notifications.loginDescription');
    case 'CREATE':
      return t('notifications.createDescription');
    case 'DELETE':
      return t('notifications.deleteDescription');
    case 'UPDATE':
      return t('notifications.updateDescription');
  }
};
