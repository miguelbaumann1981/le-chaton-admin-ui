import { Link } from 'react-router';
import { useI18n } from '../../../../i18n';
import { NotificationCardDashboard } from './NotificationCardDashboard';
import { useLatestNotifications } from '../hooks/useLatestNotifications';
import type { NotificationLog } from '../interfaces/notification-log.interface';

export const NotificationsSection = () => {
  const { t } = useI18n();
  const { data } = useLatestNotifications(5);

  return (
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
          <NotificationCardDashboard key={notification?.id} {...notification} />
        ))}
      </div>
    </div>
  );
};
