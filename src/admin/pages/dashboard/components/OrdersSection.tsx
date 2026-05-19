import { OrderCardDashboard } from './OrderCardDashboard';

export const OrdersSection = () => {
  return (
    <>
      <div className='flex flex-col gap-3 w-full'>
        <h2 className='text-2xl'>Orders Section</h2>

        <div className='grid grid-cols-3 gap-3'>
          <OrderCardDashboard />
          <OrderCardDashboard />
          <OrderCardDashboard />
        </div>
      </div>
    </>
  );
};
