import type { OrderStatus } from '../../../types/order-status.type';
import { useOrderStatusText } from '../../../hooks/useOrderStatusText';
import { useOrderStatusStyle } from '../../../hooks/useOrderStatusStyle';

interface OrderProps {
  name: string;
  date: string | Date;
  price: number;
  status: OrderStatus;
}

export const OrderCardDashboard = ({
  name,
  date,
  price,
  status,
}: OrderProps) => {
  const statusText = useOrderStatusText(status);
  const statusStyle = useOrderStatusStyle(status);

  return (
    <div className='card bg-base-300 border border-gray-600'>
      <div className='card-body'>
        <h2 className='card-title text-base-content'>{name}</h2>
        <p>{new Date(date).toLocaleDateString()}</p>
        <div className='flex items-center justify-between mt-3'>
          <div className='badge badge-secondary text-lg'>
            {price?.toFixed(2)} €
          </div>
          <div className={`badge badge-soft font-medium ${statusStyle}`}>
            {statusText}
          </div>
        </div>
      </div>
    </div>
  );
};
