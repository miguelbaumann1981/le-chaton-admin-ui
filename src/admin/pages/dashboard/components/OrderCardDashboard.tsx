import { useOrderStatusText } from '../hooks/useOrderStatusText';
import { useOrderStatusStyle } from '../hooks/useOrderStatusStyle';
import type { Order } from '../../orders/interfaces/order.interface';
import { OrderDetailsModal } from '../../orders/components/OrderDetailsModal';
import { NumericFormat } from 'react-number-format';

export const OrderCardDashboard = (order: Order) => {
  const statusText = useOrderStatusText(order?.status);
  const statusStyle = useOrderStatusStyle(order?.status);

  const displayDate = new Date(order?.orderDate).toLocaleDateString();

  return (
    <>
      <div
        className='card bg-base-300 border border-gray-600 cursor-pointer hover:bg-base-100 transition-colors'
        onClick={() => {
          const dialog = document.getElementById(
            order?.id,
          ) as HTMLDialogElement | null;
          dialog?.showModal();
        }}
      >
        <div className='card-body'>
          <h2 className='card-title text-base-content'>{order?.description}</h2>
          <p>{displayDate}</p>
          <div className='flex items-center justify-between mt-3'>
            <div className='badge badge-outline badge-info text-base'>
              <NumericFormat
                value={order?.totalPrice}
                thousandSeparator='.'
                decimalSeparator=','
                suffix={' €'}
                decimalScale={2}
                fixedDecimalScale={true}
                displayType='text'
              />
            </div>
            <div className={`badge badge-soft font-medium ${statusStyle}`}>
              {statusText}
            </div>
          </div>
        </div>
      </div>

      <OrderDetailsModal {...order} />
    </>
  );
};
