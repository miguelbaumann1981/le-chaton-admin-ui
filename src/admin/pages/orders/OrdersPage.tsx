import {
  MdLibraryBooks,
  MdOutlineFilterAltOff,
  MdOutlineSearch,
} from 'react-icons/md';
import { useI18n } from '../../../i18n';
import { useOrders } from './hooks/useOrders';
import type { Order } from './interfaces/order.interface';
import { Spinner } from '../../components/Spinner';
import { useState } from 'react';
import type { OrderStatus } from './types/order-status.type';
import { Paginator } from '../../components/Paginator';
import { OrderDetailsModal } from './components/OrderDetailsModal';
import { SearchOrderModal } from './components/SearchOrderModal';
import { useQueryClient } from '@tanstack/react-query';

export const OrdersPage = () => {
  const { t } = useI18n();
  const limitByDefault: number = 10;
  const [customLimit, setCustomLimit] = useState(limitByDefault);
  const [customState, setCustomState] = useState<OrderStatus>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, error } = useOrders(customLimit, customState);

  const ordersData: Order[] = data?.orders || [];
  const totalResults = data?.total || 0;
  const totalPages =
    data?.total && data?.limit ? Math.ceil(data.total / data.limit) : 0;
  const queryClient = useQueryClient();

  const handleOpenOrderModal = (id: string) => {
    const dialog = document.getElementById(id) as HTMLDialogElement | null;
    dialog?.showModal();
  };

  const handleOrderStatusNode = (status: OrderStatus): React.ReactNode => {
    switch (status) {
      case 0:
        return (
          <span className='badge badge-soft badge-error'>
            {t('orders.canceled')}
          </span>
        );
      case 1:
        return (
          <span className='badge badge-soft badge-warning'>
            {t('orders.registered')}
          </span>
        );
      case 2:
        return (
          <span className='badge badge-soft badge-info'>
            {t('orders.inProgress')}
          </span>
        );
      case 3:
        return (
          <span className='badge badge-soft badge-success'>
            {t('orders.delivered')}
          </span>
        );
    }
  };

  const handleStateFilter = (state: OrderStatus) => {
    if (state === null) {
      setCustomLimit(limitByDefault);
      setCustomState(null);
      return;
    }
    setCustomLimit(1000);
    setCustomState(state);
  };

  const handleClose = () => {
    setIsOpen(false);

    queryClient.invalidateQueries({
      queryKey: [
        'orders',
        {
          page: 1,
          limit: limitByDefault,
          state: null,
        },
      ],
    });
  };

  return (
    <>
      <div className='flex flex-col gap-5'>
        <h1 className='text-4xl font-bold mb-4 flex items-center gap-2'>
          <MdLibraryBooks /> {t('menu.orders')}
        </h1>

        {/* FILTERS */}
        <div className='flex flex-row justify-between items-center'>
          <div className='flex gap-15 items-center'>
            <button
              className='btn btn-neutral'
              onClick={() => {
                const dialog = document.getElementById(
                  'searcher',
                ) as HTMLDialogElement | null;
                dialog?.showModal();
              }}
            >
              <MdOutlineSearch /> {t('common.searcher')}
            </button>

            {/* STATES */}
            <div className='flex items-center gap-1'>
              <button
                className={`btn btn-error ${customState === 0 ? 'btn-outline' : 'btn-soft'}`}
                onClick={() => handleStateFilter(0)}
              >
                {t('orders.canceled')}
              </button>
              <button
                className={`btn btn-warning ${customState === 1 ? 'btn-outline' : 'btn-soft'}`}
                onClick={() => handleStateFilter(1)}
              >
                {t('orders.registered')}
              </button>
              <button
                className={`btn btn-info ${customState === 2 ? 'btn-outline' : 'btn-soft'}`}
                onClick={() => handleStateFilter(2)}
              >
                {t('orders.inProgress')}
              </button>
              <button
                className={`btn btn-success ${customState === 3 ? 'btn-outline' : 'btn-soft'}`}
                onClick={() => handleStateFilter(3)}
              >
                {t('orders.delivered')}
              </button>
            </div>
          </div>

          <div className='flex items-center gap-5'>
            <div className='flex items-center gap-2'>
              <span className='text-sm'>{t('common.results')}</span>
              <span className='badge badge-outline badge-accent'>
                {totalResults}
              </span>
            </div>

            <button
              className='btn btn-neutral'
              disabled={customState === null}
              onClick={() => handleStateFilter(null)}
            >
              <MdOutlineFilterAltOff /> {t('common.restoreFilters')}
            </button>
          </div>
        </div>

        {error && (
          <div className='w-full border border-red-100 p-5 text-center'>
            {t('common.serverError')}
          </div>
        )}

        {/* RESULTS */}
        {isLoading && !error ? (
          <div className='w-full h-75 flex flex-col items-center justify-center'>
            <Spinner />
          </div>
        ) : (
          <div className='card bg-base-300 border border-gray-600 rounded-t-lg'>
            <div
              className={`overflow-x-auto ${customLimit === 1000 ? 'max-h-150' : ''}`}
            >
              <table className='table table-zebra'>
                <thead>
                  <tr className='bg-white/10 text-white'>
                    <th className='border-b-gray-600'>{t('orders.idOrder')}</th>
                    <th className='border-b-gray-600'>
                      {t('orders.orderDate')}
                    </th>
                    <th className='border-b-gray-600'>{t('orders.name')}</th>
                    <th className='border-b-gray-600'>{t('orders.state')}</th>
                  </tr>
                </thead>

                <tbody>
                  {ordersData.length === 0 && (
                    <div className='w-full p-5 text-center text-xl text-white'>
                      {t('orders.noOrders')}
                    </div>
                  )}

                  {ordersData.map((order) => (
                    <tr
                      key={order?.id}
                      className='cursor-pointer hover:bg-accent-content hover:text-white'
                      onClick={() => handleOpenOrderModal(order?.id)}
                    >
                      <td className='border-b-gray-600'>{order?.id}</td>

                      <td className='border-b-gray-600'>
                        {order?.orderDate
                          ? new Date(order.orderDate).toLocaleString()
                          : '-'}
                      </td>

                      <td className='border-b-gray-600'>
                        {order?.description}
                      </td>

                      <td className='border-b-gray-600'>
                        {handleOrderStatusNode(order?.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PAGINATOR */}
        {totalPages > 1 && (
          <div className='flex justify-between items-center my-4 border-t-gray-600'>
            <Paginator totalPages={totalPages} />

            <div className='flex gap-2 items-center'>
              <span className='text-sm'>{t('common.resultsPerPage')}</span>
              <input
                type='number'
                placeholder={`${t('commonn.enterLimit')}...`}
                className='input w-18 text-center'
                value={customLimit}
                onChange={(e) => {
                  const limit = e.target.value;
                  if (!limit || limit === '0') return;
                  setCustomLimit(Number(limit));
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* MODAL FOR ORDER */}
      {ordersData.map((order) => (
        <OrderDetailsModal
          key={order?.id}
          order={order}
          isOpen={isOpen}
          onClose={handleClose}
        />
      ))}

      {/* Modal for Searcher */}
      <SearchOrderModal idRef='searcher' />
    </>
  );
};
