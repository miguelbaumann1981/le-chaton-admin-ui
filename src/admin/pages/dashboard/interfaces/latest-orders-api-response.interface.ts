import type { Order } from '../../orders/interfaces/order.interface';

export interface LatestOrdersApiResponse {
  total: number;
  orders: Order[];
}
