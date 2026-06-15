import { useQuery } from '@tanstack/react-query';
import { deleteUserAction } from '../actions/delete-user.action';

export const useDeleteUser = (id: string) => {
  return useQuery({
    queryKey: ['delete user', id],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return deleteUserAction(id);
    },
    staleTime: 1000 * 60 * 5,
  });
};
