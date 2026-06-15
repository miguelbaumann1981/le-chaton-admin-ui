import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../../../../i18n';
import type { AuthUser } from '../interfaces/auth-user.interface';
import type { AuthRole } from '../types/role-user.type';
import {
  MdCancel,
  MdCheckBox,
  MdCheckCircle,
  MdError,
  MdOutlineCancel,
} from 'react-icons/md';
import { useDeleteUser } from '../hooks/useDeleteUser';
import { Spinner } from '../../../components/Spinner';

interface Props {
  user: AuthUser;
  isOpen: boolean;
  onClose: () => void;
}

export const UserDetailModal = ({ user, isOpen, onClose }: Props) => {
  const { t } = useI18n();
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [deletedId, setDeletedId] = useState('');
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const { isLoading, error } = useDeleteUser(deletedId);

  useEffect(() => {
    const modal = modalRef.current;

    if (isOpen) {
      modal?.showModal();
    } else {
      modal?.close();
    }

    const handleCancel = () => onClose;
    modal?.addEventListener('close', handleCancel);

    return () => modal?.removeEventListener('close', handleCancel);
  }, [isOpen, onClose]);

  const handleRoleText = (role: AuthRole): string => {
    switch (role) {
      case 'USER_ROLE':
        return t('USER_ROLE');

      case 'ADMIN_ROLE':
        return t('ADMIN_ROLE');
    }
    return t('USER_ROLE');
  };

  const handleResetSectionsDisplayed = () => {
    setShowDeleteUser(false);
    setShowSuccessMessage(false);
    setShowErrorMessage(false);
  };

  const handleDeleteUser = (id: string) => {
    setDeletedId(id);

    if (error) {
      setShowErrorMessage(true);
      setAlertMessage(t('users.errorDeleted'));
      return;
    }

    setAlertMessage(t('users.successDeleted'));
    setTimeout(() => {
      setShowSuccessMessage(true);
    }, 1000);
  };

  const handleCloseSuccessMessage = () => {
    setShowSuccessMessage(false);
    setShowDeleteUser(false);
  };

  return (
    <>
      <dialog id={user?.id} className='modal'>
        <div className='modal-box flex flex-col gap-3'>
          <div className='flex items-center justify-between gap-3'>
            <h3 className='font-bold text-xl text-white'>{user?.name}</h3>
            <span
              className={`badge badge-soft ${user?.role[0] === 'USER_ROLE' ? 'badge-info' : 'badge-warning'}`}
            >
              {handleRoleText(user?.role[0])}
            </span>
          </div>

          <div className='flex text-sm'>
            <span className='w-35'>{t('users.idUser')}</span>
            <span className='text-white'>{user?.id}</span>
          </div>

          <div className='flex text-sm'>
            <span className='w-35'>{t('users.email')}</span>
            <span className='text-white'>{user?.email}</span>
          </div>

          <div className='flex text-sm'>
            <span className='w-35'>{t('users.isValidated')}</span>
            {user?.emailValidated ? (
              <MdCheckBox size={20} color='lightgreen' />
            ) : (
              <MdCancel size={20} color='lightsalmon' />
            )}
          </div>

          {showDeleteUser && (
            <div className='flex flex-col gap-2 mt-3'>
              <p className='text-sm text-warning'>{t('users.sureToDelete')}</p>
              <div className='flex gap-2'>
                <button
                  className='btn btn-primary btn-soft btn-sm'
                  disabled={showSuccessMessage}
                  onClick={() => handleDeleteUser(user?.id)}
                >
                  {t('common.accept')}
                </button>

                <button
                  className='btn btn-error btn-soft btn-sm'
                  disabled={showSuccessMessage}
                  onClick={() => setShowDeleteUser(false)}
                >
                  {t('common.cancel')}
                </button>

                {isLoading && !error && <Spinner />}
              </div>
            </div>
          )}

          {showErrorMessage && (
            <div
              role='alert'
              className='alert alert-error alert-soft flex flex-row items-center justify-between'
            >
              <div className='flex items-center gap-3'>
                <MdError />
                <span>{alertMessage}</span>
              </div>
              <a
                className='custom-link'
                onClick={() => setShowErrorMessage(false)}
              >
                <MdOutlineCancel size={20} />
              </a>
            </div>
          )}

          {showSuccessMessage && (
            <div
              role='alert'
              className='alert alert-success alert-soft flex flex-row items-center justify-between'
            >
              <div className='flex items-center gap-3'>
                <MdCheckCircle />
                <span>{alertMessage}</span>
              </div>
              <a
                className='custom-link'
                onClick={() => handleCloseSuccessMessage()}
              >
                <MdOutlineCancel size={20} />
              </a>
            </div>
          )}

          <div className='modal-action'>
            <button
              className='btn btn-error btn-outline'
              disabled={showDeleteUser}
              onClick={() => setShowDeleteUser(true)}
            >
              {t('common.delete')}
            </button>

            <form method='dialog'>
              <button
                className='btn btn-outline'
                onClick={onClose}
                onClickCapture={handleResetSectionsDisplayed}
              >
                {t('common.close')}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
