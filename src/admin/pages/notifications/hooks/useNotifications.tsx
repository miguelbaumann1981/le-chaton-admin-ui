import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import type { ActionNotification } from '../../dashboard/types/notification-action.type';
import { getNotificationsAction } from '../actions/get-notifications.action';

export const useNotifications = (
  customLimit: number,
  customNotification: ActionNotification,
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
        notification: customNotification,
      },
    ],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return getNotificationsAction({
        page,
        limit,
        notification: customNotification,
      });
    },
    staleTime: 1000 * 60 * 5,
  });
};
