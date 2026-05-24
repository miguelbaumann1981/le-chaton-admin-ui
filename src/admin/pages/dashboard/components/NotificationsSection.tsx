import { Link } from 'react-router';
import { useI18n } from '../../../../i18n';
import { NotificationCardDashboard } from './NotificationCardDashboard';

export const NotificationsSection = () => {
  const { t } = useI18n();

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

      <div className='grid grid-cols-3 gap-3'>
        <NotificationCardDashboard />
        <NotificationCardDashboard />
        <NotificationCardDashboard />
        <NotificationCardDashboard />
        <NotificationCardDashboard />
        <NotificationCardDashboard />
      </div>
    </div>
  );
};
