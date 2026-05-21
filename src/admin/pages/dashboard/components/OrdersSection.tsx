import { useOrders } from '../../../hooks/useOrders';
import { OrderCardDashboard } from './OrderCardDashboard';

export const OrdersSection = () => {
  const { data } = useOrders(3);
  console.log(data?.orders);

  return (
    <>
      <div className='flex flex-col gap-3 w-full'>
        <h2 className='text-2xl'>Orders Section</h2>

        <div className='grid grid-cols-3 gap-3'>
          {data?.orders.map((order) => (
            <OrderCardDashboard
              key={order.id}
              name={order?.description}
              date={order?.orderDate}
              price={order?.totalPrice}
              status={order?.status}
            />
          ))}
        </div>
      </div>
    </>
  );
};
