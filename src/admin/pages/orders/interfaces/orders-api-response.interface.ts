import type { Order } from './order.interface';

export interface OrdersApiResponse {
  page: number;
  limit: number;
  total: number;
  next: string | null;
  previous: string | null;
  orders: Order[];
}
