import { Link } from 'react-router';
import { useI18n } from '../../../../i18n';
import { NotificationCardDashboard } from './NotificationCardDashboard';
import { useLatestNotifications } from '../hooks/useLatestNotifications';
import type { NotificationLog } from '../interfaces/notification-log.interface';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { MdCheckCircle, MdOutlineCancel } from 'react-icons/md';

export const NotificationsSection = () => {
  const { t } = useI18n();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const { data } = useLatestNotifications(5);
  const queryClient = useQueryClient();

  const onLoadData = (message: string) => {
    queryClient.invalidateQueries({
      queryKey: ['latestNotifications'],
    });

    setAlertMessage(message);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <>
      <div className='flex flex-col gap-3 w-full'>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-semibold'>
            {t('dashboard.latestNotifications')}
          </h2>
          <Link to='/notifications' className='text-sm custom-link'>
            {t('dashboard.viewAllNotifications')}
          </Link>
        </div>

        <div className='grid grid-cols-5 gap-3'>
          {data?.map((notification: NotificationLog) => (
            <NotificationCardDashboard
              key={notification?.id}
              notification={notification}
              onRefresh={(message) => onLoadData(message)}
            />
          ))}
        </div>
      </div>

      {showSuccessMessage && (
        <div
          role='alert'
          className='absolute top-20 right-10 min-w-75 alert alert-success flex flex-row items-center justify-between'
        >
          <div className='flex items-center gap-3'>
            <MdCheckCircle />
            <span>{alertMessage}</span>
          </div>
          <a
            className='custom-link'
            onClick={() => setShowSuccessMessage(false)}
          >
            <MdOutlineCancel size={20} color='#ffffff' />
          </a>
        </div>
      )}
    </>
  );
};
