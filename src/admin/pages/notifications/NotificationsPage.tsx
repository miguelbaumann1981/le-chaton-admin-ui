import { useState } from 'react';
import { useI18n } from '../../../i18n';
import { useNotifications } from './hooks/useNotifications';
import type { ActionNotification } from '../dashboard/types/notification-action.type';
import type { NotificationLog } from '../dashboard/interfaces/notification-log.interface';
import { useQueryClient } from '@tanstack/react-query';
import {
  MdCheckCircle,
  MdEmail,
  MdOutlineCancel,
  MdOutlineFilterAltOff,
} from 'react-icons/md';
import { Spinner } from '../../components/Spinner';
import { Paginator } from '../../components/Paginator';
import { NotificationDetailsModal } from './components/NotificationDetailsModal';
import { useSearchParams } from 'react-router';

export const NotificationsPage = () => {
  const { t } = useI18n();
  const limitByDefault: number = 9;
  const maxLimit: number = 1000;
  const [customLimit, setCustomLimit] = useState(limitByDefault);
  const [action, setAction] = useState<ActionNotification>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [searchParams] = useSearchParams();
  const { data, isLoading, error } = useNotifications(customLimit, action);
  const notificationsData: NotificationLog[] = data?.logs || [];
  const totalResults = data?.total || 0;
  const totalPages =
    data?.total && data?.limit ? Math.ceil(data.total / data.limit) : 0;

  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleOpenOrderModal = (id: string) => {
    const dialog = document.getElementById(id) as HTMLDialogElement | null;
    dialog?.showModal();
  };

  const handleClose = () => {
    setIsOpen(false);
    const currentPage = searchParams.get('page');

    queryClient.invalidateQueries({
      queryKey: [
        'notifications',
        {
          page: currentPage,
          limit: customLimit,
          action: action,
        },
      ],
    });
  };

  const handleActionFilter = (action: ActionNotification) => {
    if (action === null) {
      handleRestoreFilters();
    }

    setCustomLimit(maxLimit);
    setAction(action);
  };

  const handleRestoreFilters = () => {
    setCustomLimit(limitByDefault);
    setAction(null);
  };

  const handleMessage = (message: string) => {
    setAlertMessage(message);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const handleNotificationActionText = (
    action: ActionNotification,
  ): React.ReactNode => {
    switch (action) {
      case 'REGISTRATION':
        return (
          <span className='badge badge-soft badge-warning text-xs lg:text-sm'>
            {t('notifications.registration')}
          </span>
        );
      case 'LOGIN':
        return (
          <span className='badge badge-soft badge-primary text-xs lg:text-sm'>
            {t('notifications.login')}
          </span>
        );
      case 'CREATE':
        return (
          <span className='badge badge-soft badge-success text-xs lg:text-sm'>
            {t('notifications.create')}
          </span>
        );
      case 'DELETE':
        return (
          <span className='badge badge-soft badge-error text-xs lg:text-sm'>
            {t('notifications.delete')}
          </span>
        );
      case 'UPDATE':
        return (
          <span className='badge badge-soft badge-info text-xs lg:text-sm'>
            {t('notifications.update')}
          </span>
        );
    }
  };

  return (
    <>
      <div className='flex flex-col gap-5'>
        <h1 className='text-xl md:text-3xl font-bold mb-1 md:mb-4 flex items-center gap-2'>
          <MdEmail /> <span>{t('menu.notifications')}</span>
        </h1>

        {/* FILTERS */}
        <div className='flex flex-row justify-between items-center flex-wrap gap-3'>
          <div className='flex items-center gap-1 flex-wrap'>
            <button
              className={`btn btn-warning ${action === 'REGISTRATION' ? 'btn-outline' : 'btn-soft'}`}
              onClick={() => handleActionFilter('REGISTRATION')}
            >
              {t('notifications.registration')}
            </button>
            <button
              className={`btn btn-primary ${action === 'LOGIN' ? 'btn-outline' : 'btn-soft'}`}
              onClick={() => handleActionFilter('LOGIN')}
            >
              {t('notifications.login')}
            </button>
            <button
              className={`btn btn-success ${action === 'CREATE' ? 'btn-outline' : 'btn-soft'}`}
              onClick={() => handleActionFilter('CREATE')}
            >
              {t('notifications.create')}
            </button>
            <button
              className={`btn btn-error ${action === 'DELETE' ? 'btn-outline' : 'btn-soft'}`}
              onClick={() => handleActionFilter('DELETE')}
            >
              {t('notifications.delete')}
            </button>
            <button
              className={`btn btn-info ${action === 'UPDATE' ? 'btn-outline' : 'btn-soft'}`}
              onClick={() => handleActionFilter('UPDATE')}
            >
              {t('notifications.update')}
            </button>
          </div>

          <div className='flex items-center gap-5'>
            <div className='flex items-center gap-2'>
              <span className='text-sm'>{t('common.results')}</span>
              <span className='badge badge-outline badge-accent'>
                {totalResults}
              </span>
            </div>

            <button
              className='btn btn-neutral'
              disabled={action === null}
              onClick={() => handleRestoreFilters()}
            >
              <MdOutlineFilterAltOff /> {t('common.restoreFilters')}
            </button>
          </div>
        </div>

        {error && (
          <div className='w-full border border-red-100 p-5 text-center'>
            {t('common.serverError')}
          </div>
        )}

        {/* RESULTS */}
        {isLoading && !error ? (
          <div className='w-full h-75 flex flex-col items-center justify-center'>
            <Spinner />
          </div>
        ) : (
          <div className='card bg-base-300 border border-gray-600 rounded-t-lg'>
            <div
              className={`overflow-x-auto ${customLimit === 1000 ? 'max-h-150' : ''}`}
            >
              <table className='table table-zebra'>
                <thead>
                  <tr className='bg-white/10 text-white'>
                    <th className='border-b-gray-600'>
                      {t('notifications.idNotification')}
                    </th>
                    <th className='border-b-gray-600'>
                      {t('notifications.createdAt')}
                    </th>
                    <th className='border-b-gray-600 hidden md:block'>
                      {t('notifications.message')}
                    </th>
                    <th className='border-b-gray-600'>
                      {t('notifications.action')}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {notificationsData.length === 0 && (
                    <div className='w-full p-5 text-center text-xl text-white'>
                      {t('notifications.noNotifications')}
                    </div>
                  )}

                  {notificationsData.map((notification) => (
                    <tr
                      key={notification?.id}
                      className='cursor-pointer hover:bg-accent-content hover:text-white'
                      onClick={() => handleOpenOrderModal(notification?.id)}
                    >
                      <td className='border-b-gray-600'>{notification?.id}</td>
                      <td className='border-b-gray-600'>
                        {notification?.createdAt
                          ? `${new Date(notification.createdAt).toLocaleString()} h`
                          : '-'}
                      </td>
                      <td className='border-b-gray-600 hidden md:block'>
                        {t(`notifications.${notification?.message}`)}
                      </td>
                      <td className='border-b-gray-600'>
                        {handleNotificationActionText(notification?.action)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PAGINATOR */}
        {totalPages > 1 && (
          <div className='flex gap-3 justify-center md:justify-between items-center my-4 border-t-gray-600 flex-wrap'>
            <Paginator totalPages={totalPages} />

            <div className='flex gap-2 items-center'>
              <span className='text-sm'>{t('common.resultsPerPage')}</span>
              <input
                type='number'
                placeholder={`${t('commonn.enterLimit')}...`}
                className='input w-18 text-center'
                value={customLimit}
                onChange={(e) => {
                  const limit = e.target.value;
                  if (!limit || limit === '0') return;
                  setCustomLimit(Number(limit));
                }}
              />
            </div>
          </div>
        )}
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

      {/* MODAL FOR NOTIFICATIONS */}
      {notificationsData.map((notification) => (
        <NotificationDetailsModal
          key={notification?.id}
          notification={notification}
          isOpen={isOpen}
          onClose={handleClose}
          onMessage={(message) => handleMessage(message)}
        />
      ))}
    </>
  );
};
