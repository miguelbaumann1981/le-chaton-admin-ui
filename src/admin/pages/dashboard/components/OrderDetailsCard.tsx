import type { OrderDetail } from '../../../interfaces/order.interface';

export const OrderDetailsCard = ({
  productId,
  title,
  price,
  quantity,
}: OrderDetail) => {
  return (
    <div className='card bg-base-200 border border-gray-600 px-3 py-2'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-3'>
          <span className='badge badge-secondary'>{quantity}</span>
          <span className='font-semibold'>{title}</span>
        </div>
        <span className='badge badge-soft badge-accent'>
          {price?.toFixed(2)} €
        </span>
      </div>
      <p className='text-sm py-2'>
        ID producto: <span className='text-white'>{productId}</span>
      </p>
    </div>
  );
};
