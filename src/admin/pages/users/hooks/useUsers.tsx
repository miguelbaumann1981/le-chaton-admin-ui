import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import { getUsersAction } from '../actions/get-users.action';
import type { AuthRole } from '../types/role-user.type';

export const useUsers = (
  customLimit: number,
  customRole: AuthRole,
  id: string,
  email: string,
) => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;
  const limit = searchParams.get('limit') || customLimit;

  return useQuery({
    queryKey: [
      'users',
      {
        page,
        limit,
        role: customRole,
        id,
        email,
      },
    ],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return getUsersAction({
        page,
        limit,
        role: customRole,
        id,
        email,
      });
    },
    staleTime: 1000 * 60 * 5,
  });
};
