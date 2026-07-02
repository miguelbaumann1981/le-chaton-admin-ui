import { Link } from 'react-router';
import { useI18n } from '../../../../i18n';
import { useLatestOrders } from '../hooks/useLatestOrders';
import { OrderCardDashboard } from './OrderCardDashboard';
import type { Order } from '../../orders/interfaces/order.interface';
import { useQueryClient } from '@tanstack/react-query';
import { MdCheckCircle, MdOutlineCancel } from 'react-icons/md';
import { useState } from 'react';

export const OrdersSection = () => {
  const { t } = useI18n();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const { data } = useLatestOrders(3);
  const queryClient = useQueryClient();

  const onLoadData = (message: string) => {
    queryClient.invalidateQueries({
      queryKey: ['latestOrders'],
    });

    setAlertMessage(message);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <>
      <div className='flex flex-col gap-3 w-full'>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-semibold'>
            {t('dashboard.latestOrders')}
          </h2>
          <Link to='/orders' className='text-sm custom-link'>
            {t('dashboard.viewAllOrders')}
          </Link>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3  gap-3'>
          {data?.orders.map((order: Order) => (
            <OrderCardDashboard
              key={order.id}
              order={order}
              onRefresh={(message) => onLoadData(message)}
            />
          ))}
        </div>
      </div>

      {showSuccessMessage && (
        <div
          role='alert'
          className='absolute top-20 right-10 min-w-75 alert alert-success flex flex-row items-center justify-between'
        >
          <div className='flex items-center gap-3'>
            <MdCheckCircle />
            <span>{alertMessage}</span>
          </div>
          <a
            className='custom-link'
            onClick={() => setShowSuccessMessage(false)}
          >
            <MdOutlineCancel size={20} color='#ffffff' />
          </a>
        </div>
      )}
    </>
  );
};
