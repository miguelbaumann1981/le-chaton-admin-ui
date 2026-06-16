import {
  MdCancel,
  MdCheckBox,
  MdFace,
  MdOutlineFilterAltOff,
} from 'react-icons/md';
import { useI18n } from '../../../i18n';
import { useRef, useState } from 'react';
import { useUsers } from './hooks/useUsers';
import type { AuthUser } from './interfaces/auth-user.interface';
import { Spinner } from '../../components/Spinner';
import { Paginator } from '../../components/Paginator';
import type { AuthRole } from './types/role-user.type';
import { UserDetailModal } from './components/UserDetailsModal';
import { useQueryClient } from '@tanstack/react-query';

export const UsersPage = () => {
  const { t } = useI18n();
  const limitByDefault: number = 9;
  const maxLimit: number = 1000;
  const search = useRef<HTMLInputElement>(null);
  const [customLimit, setCustomLimit] = useState(limitByDefault);
  const [customRole, setCustomRole] = useState<AuthRole>(undefined);
  const [querySearch, setQuerySearch] = useState<string>('');
  const { data, isLoading, error } = useUsers(
    customLimit,
    customRole,
    querySearch,
  );

  const usersData: AuthUser[] = data?.users || [];
  const totalResults = data?.total || 0;
  const totalPages =
    data?.total && data?.limit ? Math.ceil(data.total / data.limit) : 0;

  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleRoleText = (role: AuthRole): string => {
    switch (role) {
      case 'USER_ROLE':
        return t('USER_ROLE');

      case 'ADMIN_ROLE':
        return t('ADMIN_ROLE');
    }
    return t('USER_ROLE');
  };

  const handleOpenOrderModal = (id: string) => {
    const dialog = document.getElementById(id) as HTMLDialogElement | null;
    dialog?.showModal();
  };

  const handleClose = () => {
    setIsOpen(false);

    queryClient.invalidateQueries({
      queryKey: [
        'users',
        {
          page: 1,
          limit: limitByDefault,
          role: undefined,
        },
      ],
    });
  };

  const handleRoleFilter = (role: AuthRole) => {
    if (search.current) {
      search.current.value = '';
    }
    if (role === undefined) {
      setCustomLimit(limitByDefault);
      setCustomRole(undefined);
      return;
    }
    setCustomLimit(maxLimit);
    setCustomRole(role);
  };

  const handleSearchByQuery = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key !== 'Enter') return;

    const query = search.current?.value;
    if (!query || query === '') {
      handleRestoreFilters();
      return;
    }
    setQuerySearch(query!);
    setCustomLimit(maxLimit);
    setCustomRole(undefined);
  };

  const handleRestoreFilters = () => {
    setCustomLimit(limitByDefault);
    setCustomRole(undefined);
    setQuerySearch('');
    if (search.current) {
      search.current.value = '';
    }
  };

  return (
    <>
      <div className='flex flex-col gap-5'>
        <h1 className='text-3xl font-bold mb-4 flex items-center gap-2'>
          <MdFace /> <span>{t('menu.users')}</span>
        </h1>

        {/* FILTERS */}
        <div className='flex flex-row justify-between items-center'>
          <div className='flex gap-15 items-center'>
            <input
              type='text'
              ref={search}
              placeholder={`${t('users.searchByIdNameEmail')}...`}
              className='input w-100'
              onKeyDown={handleSearchByQuery}
            />

            {/* ROLES */}
            <div className='flex items-center gap-1'>
              <button
                className={`btn btn-info ${customRole === 'USER_ROLE' ? 'btn-outline' : 'btn-soft'}`}
                onClick={() => handleRoleFilter('USER_ROLE')}
              >
                {t('USER_ROLE')}
              </button>
              <button
                className={`btn btn-warning ${customRole === 'ADMIN_ROLE' ? 'btn-outline' : 'btn-soft'}`}
                onClick={() => handleRoleFilter('ADMIN_ROLE')}
              >
                {t('ADMIN_ROLE')}
              </button>
            </div>
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
              disabled={customRole === undefined && querySearch === ''}
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
                    <th className='border-b-gray-600'>{t('users.idUser')}</th>
                    <th className='border-b-gray-600'>{t('users.name')}</th>
                    <th className='border-b-gray-600'>{t('users.email')}</th>
                    <th className='border-b-gray-600'>
                      {t('users.isValidated')}
                    </th>
                    <th className='border-b-gray-600'>{t('users.role')}</th>
                  </tr>
                </thead>

                <tbody>
                  {usersData.length === 0 && (
                    <div className='w-full p-5 text-center text-xl text-white'>
                      {t('users.noUsers')}
                    </div>
                  )}

                  {usersData.map((user) => (
                    <tr
                      key={user?.id}
                      className='cursor-pointer hover:bg-accent-content hover:text-white'
                      onClick={() => handleOpenOrderModal(user?.id)}
                    >
                      <td className='border-b-gray-600'>{user?.id}</td>
                      <td className='border-b-gray-600'>{user?.name}</td>
                      <td className='border-b-gray-600'>{user?.email}</td>
                      <td className='border-b-gray-600'>
                        {user?.emailValidated ? (
                          <MdCheckBox size={20} color='lightgreen' />
                        ) : (
                          <MdCancel size={20} color='lightcoral' />
                        )}
                      </td>
                      <td className='border-b-gray-600'>
                        <span
                          className={`badge badge-soft ${user?.role[0] === 'USER_ROLE' ? 'badge-info' : 'badge-warning'}`}
                        >
                          {handleRoleText(user?.role[0])}
                        </span>
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
          <div className='flex justify-between items-center my-4 border-t-gray-600'>
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

      {/* MODAL FOR ORDER */}
      {usersData.map((user) => (
        <UserDetailModal
          key={user?.id}
          user={user}
          isOpen={isOpen}
          onClose={handleClose}
        />
      ))}
    </>
  );
};
