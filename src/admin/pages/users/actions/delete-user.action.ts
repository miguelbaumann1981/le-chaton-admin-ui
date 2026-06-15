import { leChatonApi } from '../../../../api/leChatonApi';
import type { AuthUser } from '../interfaces/auth-user.interface';

export const deleteUserAction = async (
  id: string,
): Promise<AuthUser | null> => {
  if (id === '') return null;

  const { data } = await leChatonApi.delete<AuthUser>(`/api/users/${id}`);

  return data;
};
