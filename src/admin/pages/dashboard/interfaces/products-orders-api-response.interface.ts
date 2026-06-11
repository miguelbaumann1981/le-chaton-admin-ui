import type { OrderDetail } from '../../orders/interfaces/order.interface';

export interface ProductsOrdersApiResponse {
  productsOrders: OrderDetail[];
}
