import { useQuery } from '@tanstack/react-query';
import { deleteNotificationAction } from '../actions/delete-notification.action';

export const useDeleteNotification = (id: string) => {
  return useQuery({
    queryKey: ['delete notification', id],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return deleteNotificationAction(id);
    },
    staleTime: 1000 * 60 * 5,
  });
};
