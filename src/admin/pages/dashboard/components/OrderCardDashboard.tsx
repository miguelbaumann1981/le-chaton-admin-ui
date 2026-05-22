import { useOrderStatusText } from '../../../hooks/useOrderStatusText';
import { useOrderStatusStyle } from '../../../hooks/useOrderStatusStyle';
import type { Order } from '../../../interfaces/order.interface';
import { OrderDetailsCard } from './OrderDetailsCard';

export const OrderCardDashboard = ({
  id,
  orderDate,
  userId,
  description,
  totalPrice,
  status,
  details,
}: Order) => {
  const statusText = useOrderStatusText(status);
  const statusStyle = useOrderStatusStyle(status);

  const displayDate = new Date(orderDate).toLocaleDateString();

  return (
    <>
      <div
        className='card bg-base-300 border border-gray-600 cursor-pointer hover:bg-base-100 transition-colors'
        onClick={() => {
          const dialog = document.getElementById(
            id,
          ) as HTMLDialogElement | null;
          dialog?.showModal();
        }}
      >
        <div className='card-body'>
          <h2 className='card-title text-base-content'>{description}</h2>
          <p>{displayDate}</p>
          <div className='flex items-center justify-between mt-3'>
            <div className='badge badge-info text-base'>
              {totalPrice?.toFixed(2)} €
            </div>
            <div className={`badge badge-soft font-medium ${statusStyle}`}>
              {statusText}
            </div>
          </div>
        </div>
      </div>

      <dialog id={id} className='modal'>
        <div className='modal-box flex flex-col gap-2'>
          <div className='flex items-center justify-between py-2'>
            <h3 className='font-bold text-lg'>{description}</h3>
            <div className={`badge badge-soft font-medium ${statusStyle}`}>
              {statusText}
            </div>
          </div>

          <div className='badge badge-info'>{totalPrice?.toFixed(2)} €</div>

          <p className='text-sm'>
            ID pedido: <span className='text-white'>{id}</span>
          </p>

          <p className='text-sm'>
            Fecha pedido: <span className='text-white'>{displayDate}</span>
          </p>

          <p className='text-sm'>
            ID usuario: <span className='text-white'>{userId}</span>
          </p>

          {/* <p>{JSON.stringify(details)}</p> */}
          <OrderDetailsCard />
          <div className='modal-action'>
            <form method='dialog'>
              <button className='btn'>Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
