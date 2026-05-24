import { useNotificationActionDescription } from '../../../hooks/useNotificationActionDescription';
import { useNotificationActionStyle } from '../../../hooks/useNotificationActionStyle';
import { useNotificationActionText } from '../../../hooks/useNotificationActionText';
import { MdInfo } from 'react-icons/md';
import { useNotificationColor } from '../../../hooks/useNotificationColor';

export const NotificationCardDashboard = () => {
  const notificationText = useNotificationActionText('REGISTRATION');
  const notificationStyle = useNotificationActionStyle('REGISTRATION');
  const notificationDescription =
    useNotificationActionDescription('REGISTRATION');
  const notificationColor = useNotificationColor('REGISTRATION');

  return (
    <>
      <div
        className='card bg-base-300 border border-gray-600 cursor-pointer hover:bg-base-100 transition-colors'
        onClick={() => {
          const dialog = document.getElementById(
            'id',
          ) as HTMLDialogElement | null;
          dialog?.showModal();
        }}
      >
        <div className='card-body'>
          <div className='flex items-center justify-between'>
            <div
              className={`badge badge-soft ${notificationStyle} font-medium`}
            >
              {notificationText.toUpperCase()}
            </div>

            <span>14/10/2025</span>
          </div>
        </div>
      </div>

      <dialog id={'id'} className='modal'>
        <div className='modal-box flex flex-col gap-2'>
          <h3 className='font-bold text-lg mb-5 flex items-center gap-2'>
            <MdInfo className={`text-2xl ${notificationColor}`} />
            {notificationDescription}
          </h3>

          <div className='flex text-sm'>
            <span className='w-25'>ID pedido</span>
            <span className='text-white'>6963e5a9db3e86ea4532fd65</span>
          </div>

          <div className='flex text-sm'>
            <span className='w-25'>Fecha pedido</span>
            <span className='text-white'>14/10/2025</span>
          </div>

          <div className='flex text-sm'>
            <span className='w-25'>ID usuario</span>
            <span className='text-white'>6963e5a9db3e86ea4532fd65</span>
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
