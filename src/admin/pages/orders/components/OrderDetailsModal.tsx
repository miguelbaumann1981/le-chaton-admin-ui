import { useI18n } from '../../../../i18n';
import type { Order } from '../interfaces/order.interface';
import { OrderDetailsCard } from '../../dashboard/components/OrderDetailsCard';
import { useOrderStatusNode } from '../hooks/useOrderStatusNode';

export const OrderDetailsModal = (order: Order) => {
  const { t } = useI18n();

  const displayDate = new Date(order?.orderDate).toLocaleString();
  const state = useOrderStatusNode(order?.status);

  return (
    <>
      <dialog id={order?.id} className='modal'>
        <div className='modal-box flex flex-col gap-3'>
          <div className='flex items-center justify-between'>
            <h3 className='font-bold text-lg'>{order?.description}</h3>
            {state}
          </div>

          <div className='badge badge-lg badge-outline badge-primary'>
            {order?.totalPrice?.toFixed(2)} €
          </div>

          <div className='flex text-sm'>
            <span className='w-30'>{t('orders.idOrder')}</span>
            <span className='text-white'>{order?.id}</span>
          </div>

          <div className='flex text-sm'>
            <span className='w-30'>{t('orders.orderDate')}</span>
            <span className='text-white'>{displayDate}</span>
          </div>

          <div className='flex text-sm'>
            <span className='w-30'>{t('orders.userId')}</span>
            <span className='text-white'>{order?.userId}</span>
          </div>

          <div className='flex flex-col gap-2 mt-3'>
            <span className='text-sm'>{t('orders.details')}</span>
            {order?.details?.map((detail) => (
              <OrderDetailsCard
                key={detail.productId}
                productId={detail.productId}
                title={detail.title}
                price={detail.price}
                quantity={detail.quantity}
              />
            ))}
          </div>

          <div className='modal-action'>
            <form method='dialog'>
              <button className='btn btn-outline btn-error'>
                {t('common.close')}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
