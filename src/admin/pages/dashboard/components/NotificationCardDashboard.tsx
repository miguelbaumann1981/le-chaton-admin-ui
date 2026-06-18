import { useNotificationActionStyle } from '../hooks/useNotificationActionStyle';
import { useNotificationActionText } from '../hooks/useNotificationActionText';
import type { NotificationLog } from '../interfaces/notification-log.interface';
import { NotificationDetailsModal } from '../../notifications/components/NotificationDetailsModal';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export const NotificationCardDashboard = (notification: NotificationLog) => {
  const limitByDefault: number = 9;
  const notificationText = useNotificationActionText(notification?.action);
  const notificationStyle = useNotificationActionStyle(notification?.action);
  const displayDate = new Date(notification?.createdAt).toLocaleDateString();
  const displayTime = new Date(notification?.createdAt)
    .toLocaleString()
    .split(',');
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleOpenDetailsModal = () => {
    const dialog = document.getElementById(
      notification?.id,
    ) as HTMLDialogElement | null;
    dialog?.showModal();
  };

  const handleClose = () => {
    setIsOpen(false);

    queryClient.invalidateQueries({
      queryKey: [
        'notifications',
        {
          page: 1,
          limit: limitByDefault,
          action: null,
        },
      ],
    });
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
      />
    </>
  );
};
