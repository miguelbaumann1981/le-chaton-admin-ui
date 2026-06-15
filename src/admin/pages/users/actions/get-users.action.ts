import { leChatonApi } from '../../../../api/leChatonApi';
import type { UsersApiResponse } from '../interfaces/users-api-response.interface';
import type { AuthRole } from '../types/role-user.type';

interface Options {
  page?: number | string;
  limit?: number | string;
  role?: AuthRole;
  id?: string;
  email?: string;
}

export const getUsersAction = async (
  options: Options,
): Promise<UsersApiResponse> => {
  const { page, limit, role, id, email } = options;

  const { data } = await leChatonApi.get<UsersApiResponse>('/api/users', {
    params: {
      page,
      limit,
    },
  });

  if (role !== undefined) {
    const filteredUsers = data.users.filter((user) => user?.role[0] === role);
    return {
      ...data,
      total: filteredUsers.length,
      users: filteredUsers,
    };
  }

  if (id) {
    const filteredUsers = data.users.filter((user) => user?.id === id);
    return {
      ...data,
      total: filteredUsers.length,
      users: filteredUsers,
    };
  }

  if (email) {
    const filteredUsers = data.users.filter((user) => user?.email === email);
    return {
      ...data,
      total: filteredUsers.length,
      users: filteredUsers,
    };
  }

  return data;
};
