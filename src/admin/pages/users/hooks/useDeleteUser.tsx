import { useQuery } from '@tanstack/react-query';
import { deleteUserAction } from '../actions/delete-user.action';

export const useDeleteUser = (id: string) => {
  return useQuery({
    queryKey: ['delete user', id],
    queryFn: () => deleteUserAction(id),
    staleTime: 1000 * 60 * 5,
  });
};
