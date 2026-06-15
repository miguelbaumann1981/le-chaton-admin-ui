import { leChatonApi } from '../../../../api/leChatonApi';
import type { UsersApiResponse } from '../interfaces/users-api-response.interface';
import type { AuthRole } from '../types/role-user.type';

interface Options {
  page?: number | string;
  limit?: number | string;
  role?: AuthRole;
}

export const getUsersAction = async (
  options: Options,
): Promise<UsersApiResponse> => {
  const { page, limit, role } = options;

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

  return data;
};
