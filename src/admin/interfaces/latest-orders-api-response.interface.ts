import type { Order } from './orders-api-response.interface';

export interface LatestOrdersApiResponse {
  total: number;
  orders: Order[];
}
