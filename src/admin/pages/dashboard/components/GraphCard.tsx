import { MdFullscreen } from 'react-icons/md';
import GraphOrdersByMonth from './graphics/GraphOrdersByMonth';
import type React from 'react';
import GraphOrdersProductsQuantity from './graphics/GraphOrdersProductsQuantity';
import GraphOrdersPriceDate from './graphics/GraphOrdersPriceDate';
import GraphOrdersByAction from './graphics/GraphOrdersByAction';

interface Props {
  id: string;
  title: string;
}

export const GraphCard = ({ id, title }: Props) => {
  const handleOpenModal = (id: string) => {
    const dialog = document.getElementById(id) as HTMLDialogElement | null;
    dialog?.showModal();
  };

  const handleReturnGraph = (id: string): React.ReactNode => {
    switch (id) {
      case 'productsInOrders':
        return <GraphOrdersProductsQuantity />;
      case 'ordersByMonth':
        return <GraphOrdersByMonth />;
      case 'salesByMonth':
        return <GraphOrdersPriceDate />;
      case 'ordersByAction':
        return <GraphOrdersByAction />;
    }
  };

  return (
    <>
      <div className='flex flex-col gap-3 border border-gray-600 py-4 px-8 bg-base-300 rounded-lg'>
        <div className='flex items-center justify-between'>
          <h2 className='text-base font-semibold'>{title}</h2>
          <a className='custom-link' onClick={() => handleOpenModal(id)}>
            <MdFullscreen />
          </a>
        </div>

        {handleReturnGraph(id)}
      </div>

      <dialog id={id} className='modal'>
        <div className='modal-box w-11/12 max-w-5xl'>
          <h3 className='font-bold text-lg mb-4'>{title}</h3>
          {handleReturnGraph(id)}
          <div className='modal-action'>
            <form method='dialog'>
              <button className='btn btn-outline'>Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
