import type { Order } from '../../orders/interfaces/orders-api-response.interface';

export interface LatestOrdersApiResponse {
  total: number;
  orders: Order[];
}
