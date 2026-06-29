import { MdError, MdInfo, MdOutlineCancel } from 'react-icons/md';
import type { NotificationLog } from '../../dashboard/interfaces/notification-log.interface';
import { useNotificationColor } from '../../dashboard/hooks/useNotificationColor';
import { useI18n } from '../../../../i18n';
import { useEffect, useRef, useState } from 'react';
import { useDeleteNotification } from '../hooks/useDeleteNotification';
import { Spinner } from '../../../components/Spinner';

interface Props {
  notification: NotificationLog;
  isOpen: boolean;
  onClose: () => void;
  onMessage: (message: string) => void;
}

export const NotificationDetailsModal = ({
  notification,
  isOpen,
  onClose,
  onMessage,
}: Props) => {
  const { t } = useI18n();
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const notificationColor = useNotificationColor(notification?.action);
  const [showDeleteNotification, setShowDeleteNotification] = useState(false);
  const [deletedId, setDeletedId] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const { isLoading, error } = useDeleteNotification(deletedId);

  const displayDate = new Date(notification?.createdAt).toLocaleString();
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

  const handleResetSectionsDisplayed = () => {
    setShowDeleteNotification(false);
    setShowErrorMessage(false);
  };

  const handleDeleteNotification = (id: string) => {
    setDeletedId(id);

    if (error) {
      setShowErrorMessage(true);
      setAlertMessage(t('notifications.errorDeleted'));
      return;
    }

    setAlertMessage(t('notifications.successDeleted'));
    setTimeout(() => {
      onClose();
      onMessage(t('notifications.successDeleted'));
      const dialog = document.getElementById(id) as HTMLDialogElement | null;
      dialog?.close();
      setShowDeleteNotification(false);
    }, 1000);
  };

  return (
    <dialog id={notification?.id} className='modal'>
      <div className='modal-box flex flex-col gap-2'>
        <h3 className='font-bold text-lg mb-5 flex items-center gap-2'>
          <MdInfo className={`text-2xl ${notificationColor}`} />
          {t(`notifications.${notification?.message}`)}
        </h3>

        {notification?.orderId && (
          <div className='flex text-sm'>
            <span className='w-25'>{t('orders.idOrder')}</span>
            <span className='text-white'>{notification?.orderId}</span>
          </div>
        )}

        <div className='flex text-sm'>
          <span className='w-25'>{t('notifications.date')}</span>
          <span className='text-white'>{displayDate} h</span>
        </div>

        <div className='flex text-sm'>
          <span className='w-25'>{t('notifications.userId')}</span>
          <span className='text-white'>{notification?.userId}</span>
        </div>

        {showDeleteNotification && (
          <div className='flex flex-col gap-2 mt-3'>
            <p className='text-sm text-warning'>
              {t('notifications.sureToDelete')}
            </p>
            <div className='flex gap-2'>
              <button
                className='btn btn-primary btn-soft btn-sm'
                onClick={() => handleDeleteNotification(notification?.id)}
              >
                {t('common.accept')}
              </button>

              <button
                className='btn btn-error btn-soft btn-sm'
                onClick={() => setShowDeleteNotification(false)}
              >
                {t('common.cancel')}
              </button>

              {isLoading && !error && <Spinner />}
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

        <div className='modal-action'>
          <button
            className='btn btn-error btn-outline'
            disabled={showDeleteNotification}
            onClick={() => setShowDeleteNotification(true)}
          >
            {t('common.delete')}
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
  );
};
