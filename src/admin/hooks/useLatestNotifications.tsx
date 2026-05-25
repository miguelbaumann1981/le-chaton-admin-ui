import { useQuery } from '@tanstack/react-query';
import { getLatestNotificationsAction } from '../actions/get-latest-notifications.action';

export const useLatestNotifications = (limit: number) => {
  return useQuery({
    queryKey: ['latestNotifications'],
    queryFn: () => getLatestNotificationsAction(limit),
    staleTime: 1000 * 60 * 5,
  });
};
