import { useI18n } from '../../../../i18n';
import type { OrderStatus } from '../../orders/types/order-status.type';

export const useOrderStatusText = (status: OrderStatus): string => {
  const { t } = useI18n();

  switch (status) {
    case 0:
      return t('orders.canceled');
    case 1:
      return t('orders.registered');
    case 2:
      return t('orders.inProgress');
    case 3:
      return t('orders.delivered');
  }
  return '';
};
