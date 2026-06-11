import type { OrderStatus } from '../types/order-status.type';

export const useOrderStatusStyle = (status: OrderStatus): string => {
  switch (status) {
    case 0:
      return 'badge-error';
    case 1:
      return 'badge-warning';
    case 2:
      return 'badge-info';
    case 3:
      return 'badge-success';
  }
};
