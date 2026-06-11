import { Link } from 'react-router';
import { useI18n } from '../../../../i18n';
import { useLatestOrders } from '../hooks/useLatestOrders';
import { OrderCardDashboard } from './OrderCardDashboard';
import type { Order } from '../../orders/interfaces/order.interface';

export const OrdersSection = () => {
  const { t } = useI18n();
  const { data } = useLatestOrders(3);

  return (
    <div className='flex flex-col gap-3 w-full'>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-semibold'>{t('dashboard.latestOrders')}</h2>
        <Link to='/orders' className='text-sm custom-link'>
          {t('dashboard.viewAllOrders')}
        </Link>
      </div>

      <div className='grid grid-cols-3 gap-3'>
        {data?.orders.map((order: Order) => (
          <OrderCardDashboard key={order.id} {...order} />
        ))}
      </div>
    </div>
  );
};
