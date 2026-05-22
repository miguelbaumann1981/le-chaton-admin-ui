import { useLatestOrders } from '../../../hooks/useLatestOrders';
import { OrderCardDashboard } from './OrderCardDashboard';

export const OrdersSection = () => {
  const { data } = useLatestOrders();
  console.log(data?.orders);

  return (
    <>
      <div className='flex flex-col gap-3 w-full'>
        <h2 className='text-2xl'>Orders Section</h2>

        <div className='grid grid-cols-3 gap-3'>
          {data?.orders.map((order) => (
            <OrderCardDashboard
              key={order.id}
              id={order.id}
              description={order?.description}
              orderDate={order?.orderDate}
              userId={order?.userId}
              totalPrice={order?.totalPrice}
              status={order?.status}
              details={order?.details}
            />
          ))}
        </div>
      </div>
    </>
  );
};
