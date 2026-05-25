import { useI18n } from '../../i18n';

export const useNotificationActionDescription = (message: string): string => {
  const { t } = useI18n();

  switch (message) {
    case 'NEW_LOGIN_DONE':
      return t('notifications.NEW_LOGIN_DONE');
    case 'NEW_ORDER_REGISTERED_BY':
      return t('notifications.NEW_ORDER_REGISTERED_BY');
    case 'ORDER_DELETED_BY':
      return t('notifications.ORDER_DELETED_BY');
    case 'ORDER_UPDATED_BY':
      return t('notifications.ORDER_UPDATED_BY');
    case 'NEW_REGISTER_CREATED':
      return t('notifications.NEW_REGISTER_CREATED');
  }
  return '';
};
