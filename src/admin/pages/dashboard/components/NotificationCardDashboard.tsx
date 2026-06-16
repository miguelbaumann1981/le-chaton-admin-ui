import { useNotificationActionStyle } from '../hooks/useNotificationActionStyle';
import { useNotificationActionText } from '../hooks/useNotificationActionText';
import type { NotificationLog } from '../interfaces/notification-log.interface';
import { NotificationDetailsModal } from '../../notifications/components/NotificationDetailsModal';

export const NotificationCardDashboard = (notification: NotificationLog) => {
  const notificationText = useNotificationActionText(notification?.action);
  const notificationStyle = useNotificationActionStyle(notification?.action);
  const displayDate = new Date(notification?.createdAt).toLocaleDateString();

  const handleOpenDetailsModal = () => {
    const dialog = document.getElementById(
      notification?.id,
    ) as HTMLDialogElement | null;
    dialog?.showModal();
  };

  return (
    <>
      <div
        className='card bg-base-300 border border-gray-600 cursor-pointer hover:bg-base-100 transition-colors'
        onClick={() => handleOpenDetailsModal()}
      >
        <div className='card-body'>
          <div className='flex items-center justify-between'>
            <span
              className={`badge badge-soft ${notificationStyle} font-medium`}
            >
              {notificationText}
            </span>

            <span>{displayDate}</span>
          </div>
        </div>
      </div>

      <NotificationDetailsModal {...notification} />
    </>
  );
};
