import { useI18n } from '../../../../i18n';
import type { Order } from '../interfaces/order.interface';
import { OrderDetailsCard } from '../../dashboard/components/OrderDetailsCard';
import { useOrderStatusNode } from '../hooks/useOrderStatusNode';
import { NumericFormat } from 'react-number-format';
import { useEffect, useRef, useState } from 'react';
import type { OrderStatus } from '../types/order-status.type';
import { useDeleteOrder } from '../hooks/useDeleteOrder';
import { Spinner } from '../../../components/Spinner';
import { useUpdateOrder } from '../hooks/useUpdateOrder';
import { MdCheckCircle, MdOutlineCancel, MdError } from 'react-icons/md';

interface Props {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderDetailsModal = ({ order, isOpen, onClose }: Props) => {
  const { t } = useI18n();

  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [showStateChange, setShowStateChange] = useState(false);
  const [newState, setNewState] = useState<OrderStatus>(null);
  const [showDeleteOrder, setShowDeleteOrder] = useState(false);
  const [deletedId, setDeletedId] = useState('');
  const [updatedId, setUpdatedId] = useState('');
  const [updatedBody, setUpdatedBody] = useState<Partial<Order>>({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const displayDate = new Date(order?.orderDate).toLocaleString();
  const state = useOrderStatusNode(order?.status);
  const { isLoading: isLoadingDeleted, error: errorDeleted } =
    useDeleteOrder(deletedId);
  const { isLoading: isLoadingUpdated, error: errorUpdated } = useUpdateOrder(
    updatedId,
    updatedBody,
  );

  const handleResetSectionsDisplayed = () => {
    setShowStateChange(false);
    setShowDeleteOrder(false);
    setShowSuccessMessage(false);
    setShowErrorMessage(false);
  };

  useEffect(() => {
    const modal = modalRef.current;

    if (isOpen) {
      modal?.showModal();
    } else {
      modal?.close();
    }

    const handleCancel = () => onClose;
    modal?.addEventListener('close', handleCancel);

    return () => modal?.removeEventListener('close', handleCancel);
  }, [isOpen, onClose]);

  const handleChangeOrderState = (id: string, state: OrderStatus) => {
    const body = {
      status: state,
    };
    setUpdatedId(id);
    setUpdatedBody(body);

    if (errorUpdated) {
      setShowErrorMessage(true);
      setAlertMessage(t('orders.errorChangeState'));
      return;
    }

    setAlertMessage(t('orders.successChangeState'));
    setTimeout(() => {
      setShowSuccessMessage(true);
      setShowDeleteOrder(false);
    }, 1000);
  };

  const handleDeleteOrder = (id: string) => {
    setDeletedId(id);

    if (errorDeleted) {
      setShowErrorMessage(true);
      setAlertMessage(t('orders.errorDeleted'));
      return;
    }

    setAlertMessage(t('orders.successDeleted'));
    setTimeout(() => {
      setShowSuccessMessage(true);
    }, 1000);
  };

  const handleDefaultValueStateDropdown = (state: OrderStatus): string => {
    switch (state) {
      case 0:
        return t('orders.canceled');
      case 1:
        return t('orders.registered');
      case 2:
        return t('orders.inProgress');
      case 3:
        return t('orders.delivered');
    }
    return '';
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
            <div className='flex flex-col gap-2 mt-3'>
              <label className='text-sm'>Seleccionar estado</label>
              <select
                defaultValue={handleDefaultValueStateDropdown(order?.status)}
                className='select'
              >
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
                  onClick={() => handleChangeOrderState(order?.id, newState)}
                >
                  {t('common.accept')}
                </button>
                <button
                  className='btn btn-error btn-soft btn-sm'
                  onClick={() => setShowStateChange(false)}
                >
                  {t('common.cancel')}
                </button>

                {isLoadingUpdated && !errorUpdated && <Spinner />}
              </div>
            </div>
          )}

          {showDeleteOrder && (
            <div className='flex flex-col gap-2 mt-3'>
              <p className='text-sm text-warning'>{t('orders.sureToDelete')}</p>
              <div className='flex gap-2'>
                <button
                  className='btn btn-primary btn-soft btn-sm'
                  disabled={showSuccessMessage}
                  onClick={() => handleDeleteOrder(order?.id)}
                >
                  {t('common.accept')}
                </button>

                <button
                  className='btn btn-error btn-soft btn-sm'
                  disabled={showSuccessMessage}
                  onClick={() => setShowDeleteOrder(false)}
                >
                  {t('common.cancel')}
                </button>

                {isLoadingDeleted && !errorDeleted && <Spinner />}
              </div>
            </div>
          )}

          {showErrorMessage && (
            <div
              role='alert'
              className='alert alert-error alert-soft flex flex-row items-center justify-between'
            >
              <div className='flex items-center gap-3'>
                <MdError />
                <span>{alertMessage}</span>
              </div>
              <a
                className='custom-link'
                onClick={() => setShowErrorMessage(false)}
              >
                <MdOutlineCancel size={20} />
              </a>
            </div>
          )}

          {showSuccessMessage && (
            <div
              role='alert'
              className='alert alert-success alert-soft flex flex-row items-center justify-between'
            >
              <div className='flex items-center gap-3'>
                <MdCheckCircle />
                <span>{alertMessage}</span>
              </div>
              <a
                className='custom-link'
                onClick={() => setShowSuccessMessage(false)}
              >
                <MdOutlineCancel size={20} />
              </a>
            </div>
          )}

          <div className='modal-action'>
            <button
              className='btn btn-error btn-outline'
              disabled={showDeleteOrder || showStateChange}
              onClick={() => setShowDeleteOrder(true)}
            >
              {t('common.delete')}
            </button>
            <button
              className='btn btn-info btn-outline'
              disabled={showStateChange || showDeleteOrder}
              onClick={() => setShowStateChange(true)}
            >
              {t('common.changeState')}
            </button>
            <form method='dialog'>
              <button
                className='btn btn-outline'
                onClick={onClose}
                onClickCapture={handleResetSectionsDisplayed}
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
