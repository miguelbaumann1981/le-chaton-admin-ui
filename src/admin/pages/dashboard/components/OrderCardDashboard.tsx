export const OrderCardDashboard = () => {
  return (
    <div className='card bg-base-300 border border-gray-600'>
      <div className='card-body'>
        <h2 className='card-title text-info'>2 x Tarta Tanuki 3 x Galletas</h2>
        <p>14/10/2026</p>
        <div className='flex items-center justify-between mt-3'>
          <div className='badge badge-secondary text-lg'>89,00 €</div>
          <div className='badge badge-soft font-medium badge-success'>
            Entregado
          </div>
        </div>
      </div>
    </div>
  );
};
