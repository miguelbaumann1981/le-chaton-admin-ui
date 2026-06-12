import { useI18n } from '../../../../i18n';
import type { Order } from '../interfaces/order.interface';
import { OrderDetailsCard } from '../../dashboard/components/OrderDetailsCard';
import { useOrderStatusNode } from '../hooks/useOrderStatusNode';
import { NumericFormat } from 'react-number-format';
import { useState } from 'react';
import type { OrderStatus } from '../types/order-status.type';
import { useDeleteOrder } from '../hooks/useDeleteOrder';
import { Spinner } from '../../../components/Spinner';
import { useNavigate } from 'react-router';

export const OrderDetailsModal = (order: Order) => {
  const { t } = useI18n();
  const navigate = useNavigate();

  const [showStateChange, setShowStateChange] = useState(false);
  const [newState, setNewState] = useState<OrderStatus>(null);
  const [showDeleteOrder, setShowDeleteOrder] = useState(false);
  const [deletedId, setDeletedId] = useState('');

  const displayDate = new Date(order?.orderDate).toLocaleString();
  const state = useOrderStatusNode(order?.status);
  const { isLoading: isLoadingDeleted, error: errorDeleted } =
    useDeleteOrder(deletedId);

  const handleCloseModal = () => {
    setShowStateChange(false);
    setShowDeleteOrder(false);
  };

  const handleChangeOrderState = (state: OrderStatus) => {
    console.log(state);
  };

  const handleDeleteOrder = (id: string) => {
    setDeletedId(id);

    if (!isLoadingDeleted && !errorDeleted) {
      const dialog = document.getElementById(id) as HTMLDialogElement | null;
      dialog?.close();
      navigate('/orders');
    }
  };

  return (
    <>
      <dialog id={order?.id} className='modal'>
        <div className='modal-box flex flex-col gap-3'>
          <div className='flex items-center justify-between gap-3'>
            <h3 className='font-bold text-xl text-white'>
              {order?.description}
            </h3>
            {state}
          </div>

          <div className='badge badge-lg badge-outline badge-primary'>
            <NumericFormat
              value={order?.totalPrice}
              thousandSeparator='.'
              decimalSeparator=','
              suffix={' €'}
              decimalScale={2}
              fixedDecimalScale={true}
              displayType='text'
            />
          </div>

          <div className='flex text-sm'>
            <span className='w-30'>{t('orders.idOrder')}</span>
            <span className='text-white'>{order?.id}</span>
          </div>

          <div className='flex text-sm'>
            <span className='w-30'>{t('orders.orderDate')}</span>
            <span className='text-white'>{displayDate}</span>
          </div>

          <div className='flex text-sm'>
            <span className='w-30'>{t('orders.userId')}</span>
            <span className='text-white'>{order?.userId}</span>
          </div>

          <div className='flex flex-col gap-2 mt-3'>
            <span className='text-sm'>{t('orders.details')}</span>
            {order?.details?.map((detail) => (
              <OrderDetailsCard
                key={detail.productId}
                productId={detail.productId}
                title={detail.title}
                price={detail.price}
                quantity={detail.quantity}
              />
            ))}
          </div>

          {showStateChange && (
            <div className='flex flex-col gap-3'>
              <select defaultValue='Seleccionar estado' className='select'>
                <option disabled={true}>Seleccionar estado</option>
                <option
                  className={`${order?.status === 0 ? 'text-base-content opacity-50' : 'text-error'}`}
                  disabled={order?.status === 0}
                  onClick={() => setNewState(0)}
                >
                  {t('orders.canceled')}
                </option>
                <option
                  className={`${order?.status === 1 ? 'text-base-content opacity-50' : 'text-warning'}`}
                  disabled={order?.status === 1}
                  onClick={() => setNewState(1)}
                >
                  {t('orders.registered')}
                </option>
                <option
                  className={`${order?.status === 2 ? 'text-base-content opacity-50' : 'text-info'}`}
                  disabled={order?.status === 2}
                  onClick={() => setNewState(2)}
                >
                  {t('orders.inProgress')}
                </option>
                <option
                  className={`${order?.status === 3 ? 'text-base-content opacity-50' : 'text-success'}`}
                  disabled={order?.status === 3}
                  onClick={() => setNewState(3)}
                >
                  {t('orders.delivered')}
                </option>
              </select>

              <div className='flex gap-2'>
                <button
                  className='btn btn-primary btn-soft btn-sm'
                  disabled={newState === null}
                  onClick={() => handleChangeOrderState(newState)}
                >
                  Aceptar
                </button>
                <button
                  className='btn btn-error btn-soft btn-sm'
                  onClick={() => setShowStateChange(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {showDeleteOrder && (
            <div className='flex flex-col gap-2 mt-3'>
              <p>Está seguro que desea eliminar...</p>
              <div className='flex gap-2'>
                <button
                  className='btn btn-primary btn-soft btn-sm'
                  onClick={() => handleDeleteOrder(order?.id)}
                >
                  Aceptar
                </button>

                <button
                  className='btn btn-error btn-soft btn-sm'
                  onClick={() => setShowDeleteOrder(false)}
                >
                  Cancelar
                </button>

                {isLoadingDeleted && !errorDeleted && <Spinner />}
                {errorDeleted && (
                  <p className='text-error text-sm'>No fue posible eliminar</p>
                )}
              </div>
            </div>
          )}

          <div className='modal-action'>
            <button
              className='btn btn-error btn-outline'
              disabled={showDeleteOrder || showStateChange}
              onClick={() => setShowDeleteOrder(true)}
            >
              Eliminar
            </button>
            <button
              className='btn btn-info btn-outline'
              disabled={showStateChange || showDeleteOrder}
              onClick={() => setShowStateChange(true)}
            >
              Cambiar estado
            </button>
            <form method='dialog'>
              <button
                className='btn btn-outline'
                onClick={() => handleCloseModal()}
              >
                {t('common.close')}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
