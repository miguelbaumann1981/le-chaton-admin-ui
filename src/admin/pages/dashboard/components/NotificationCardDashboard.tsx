import { useNotificationActionDescription } from '../hooks/useNotificationActionDescription';
import { useNotificationActionStyle } from '../hooks/useNotificationActionStyle';
import { useNotificationActionText } from '../hooks/useNotificationActionText';
import { MdInfo } from 'react-icons/md';
import { useNotificationColor } from '../hooks/useNotificationColor';
import type { NotificationLog } from '../interfaces/notification-log.interface';

export const NotificationCardDashboard = ({
  id,
  message,
  action,
  createdAt,
  userId,
  orderId,
}: NotificationLog) => {
  const notificationText = useNotificationActionText(action);
  const notificationStyle = useNotificationActionStyle(action);
  const notificationDescription = useNotificationActionDescription(message!);
  const notificationColor = useNotificationColor(action);
  const displayDate = new Date(createdAt).toLocaleDateString();

  return (
    <>
      <div
        className='card bg-base-300 border border-gray-600 cursor-pointer hover:bg-base-100 transition-colors'
        onClick={() => {
          const dialog = document.getElementById(
            id,
          ) as HTMLDialogElement | null;
          dialog?.showModal();
        }}
      >
        <div className='card-body'>
          <div className='flex items-center justify-between'>
            <div
              className={`badge badge-soft ${notificationStyle} font-medium`}
            >
              {notificationText?.toUpperCase()}
            </div>

            <span>{displayDate}</span>
          </div>
        </div>
      </div>

      <dialog id={id} className='modal'>
        <div className='modal-box flex flex-col gap-2'>
          <h3 className='font-bold text-lg mb-5 flex items-center gap-2'>
            <MdInfo className={`text-2xl ${notificationColor}`} />
            {notificationDescription}
          </h3>

          {orderId && (
            <div className='flex text-sm'>
              <span className='w-25'>ID pedido</span>
              <span className='text-white'>{orderId}</span>
            </div>
          )}

          <div className='flex text-sm'>
            <span className='w-25'>Fecha</span>
            <span className='text-white'>{displayDate}</span>
          </div>

          <div className='flex text-sm'>
            <span className='w-25'>ID usuario</span>
            <span className='text-white'>{userId}</span>
          </div>

          <div className='modal-action'>
            <form method='dialog'>
              <button className='btn'>Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
