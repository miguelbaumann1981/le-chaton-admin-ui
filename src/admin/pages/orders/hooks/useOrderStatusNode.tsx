import { useI18n } from '../../../../i18n';
import type { OrderStatus } from '../types/order-status.type';

export const useOrderStatusNode = (status: OrderStatus): React.ReactNode => {
  const { t } = useI18n();

  switch (status) {
    case 0:
      return (
        <span className='badge badge-soft badge-error'>
          {t('orders.canceled')}
        </span>
      );
    case 1:
      return (
        <span className='badge badge-soft badge-warning'>
          {t('orders.registered')}
        </span>
      );
    case 2:
      return (
        <span className='badge badge-soft badge-info'>
          {t('orders.inProgress')}
        </span>
      );
    case 3:
      return (
        <span className='badge badge-soft badge-success'>
          {t('orders.delivered')}
        </span>
      );
  }
};
