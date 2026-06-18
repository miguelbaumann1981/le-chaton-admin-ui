import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import type { ActionNotification } from '../../dashboard/types/notification-action.type';
import { getNotificationsAction } from '../actions/get-notifications.action';

export const useNotifications = (
  customLimit: number,
  customAction: ActionNotification,
) => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;
  const limit = searchParams.get('limit') || customLimit;

  return useQuery({
    queryKey: [
      'notifications',
      {
        page,
        limit,
        action: customAction,
      },
    ],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return getNotificationsAction({
        page,
        limit,
        action: customAction,
      });
    },
    // queryFn: () =>
    //   getNotificationsAction({
    //     page,
    //     limit,
    //     action: customAction,
    //   }),
    staleTime: 1000 * 60 * 5,
  });
};
