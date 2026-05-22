export const OrderDetailsCard = () => {
  return (
    <div className='card bg-base-200 border border-gray-600 px-3 py-2'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-3'>
          <span className='badge badge-secondary'>2</span>
          <span className='font-semibold'>Nombre del producto</span>
        </div>
        <span className='badge badge-soft badge-accent'>10 €</span>
      </div>
      <p className='text-sm py-2'>
        ID producto:{' '}
        <span className='text-white'>69a96d429fc600c47f79ee10</span>
      </p>
    </div>
  );
};
