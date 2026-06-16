import { MdInfo } from 'react-icons/md';
import type { NotificationLog } from '../../dashboard/interfaces/notification-log.interface';
import { useNotificationColor } from '../../dashboard/hooks/useNotificationColor';
import { useI18n } from '../../../../i18n';

export const NotificationDetailsModal = (notification: NotificationLog) => {
  const { t } = useI18n();
  const notificationColor = useNotificationColor(notification?.action);
  const displayDate = new Date(notification?.createdAt).toLocaleString();

  return (
    <dialog id={notification?.id} className='modal'>
      <div className='modal-box flex flex-col gap-2'>
        <h3 className='font-bold text-lg mb-5 flex items-center gap-2'>
          <MdInfo className={`text-2xl ${notificationColor}`} />
          {t(`notifications.${notification?.message}`)}
        </h3>

        {notification?.orderId && (
          <div className='flex text-sm'>
            <span className='w-25'>ID pedido</span>
            <span className='text-white'>{notification?.orderId}</span>
          </div>
        )}

        <div className='flex text-sm'>
          <span className='w-25'>Fecha</span>
          <span className='text-white'>{displayDate}</span>
        </div>

        <div className='flex text-sm'>
          <span className='w-25'>ID usuario</span>
          <span className='text-white'>{notification?.userId}</span>
        </div>

        <div className='modal-action'>
          <form method='dialog'>
            <button className='btn'>Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};
