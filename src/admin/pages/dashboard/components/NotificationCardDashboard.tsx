import { useNotificationActionStyle } from '../hooks/useNotificationActionStyle';
import { useNotificationActionText } from '../hooks/useNotificationActionText';
import type { NotificationLog } from '../interfaces/notification-log.interface';
import { NotificationDetailsModal } from '../../notifications/components/NotificationDetailsModal';
import { useState } from 'react';

interface Props {
  notification: NotificationLog;
  onRefresh: (message: string) => void;
}

export const NotificationCardDashboard = ({
  notification,
  onRefresh,
}: Props) => {
  const notificationText = useNotificationActionText(notification?.action);
  const notificationStyle = useNotificationActionStyle(notification?.action);
  const displayDate = new Date(notification?.createdAt).toLocaleDateString();
  const displayTime = new Date(notification?.createdAt)
    .toLocaleString()
    .split(',');
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDetailsModal = () => {
    const dialog = document.getElementById(
      notification?.id,
    ) as HTMLDialogElement | null;
    dialog?.showModal();
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleMessage = (message: string) => {
    onRefresh(message);
  };

  return (
    <>
      <div
        className='card bg-base-300 border border-gray-600 cursor-pointer hover:bg-base-100 transition-colors min-h-37'
        onClick={() => handleOpenDetailsModal()}
      >
        <div className='card-body'>
          <div className='flex flex-col gap-3'>
            <span
              className={`badge badge-soft ${notificationStyle} font-medium`}
            >
              {notificationText}
            </span>
            <span className='ml-2 text-white'>{displayDate}</span>
            <span className='ml-2 text-xs '>{displayTime[1]} h</span>
          </div>
        </div>
      </div>

      <NotificationDetailsModal
        notification={notification}
        isOpen={isOpen}
        onClose={handleClose}
        onMessage={(message) => handleMessage(message)}
      />
    </>
  );
};
