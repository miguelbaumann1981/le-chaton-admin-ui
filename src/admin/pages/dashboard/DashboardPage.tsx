export const DashboardPage = () => {
  return (
    <>
      <div className='grid grid-rows-2 gap-4'>
        <div className='grid grid-cols-2 gap-4'>
          <div className='p-2 border border-blue-200'>PEDIDOS</div>

          <div className='p-2 border border-green-200'>NOTIFICACIONES</div>
        </div>
        <div className='p-2 border border-red-200'>GRAFICOS</div>
      </div>
    </>
  );
};
