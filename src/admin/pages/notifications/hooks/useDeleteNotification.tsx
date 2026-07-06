import { useQuery } from '@tanstack/react-query';
import { deleteNotificationAction } from '../actions/delete-notification.action';

export const useDeleteNotification = (id: string) => {
  return useQuery({
    queryKey: ['delete notification', id],
    queryFn: () => deleteNotificationAction(id),
    staleTime: 1000 * 60 * 5,
  });
};
