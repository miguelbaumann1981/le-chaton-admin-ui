import type { OrderStatus } from '../types/order-status.type';

export interface OrdersApiResponse {
  page: number;
  limit: number;
  total: number;
  next: string | null;
  previous: string | null;
  orders: Order[];
}

export interface Order {
  orderDate: Date;
  userId: string;
  description: string;
  totalPrice: number;
  status: OrderStatus;
  details: OrderDetail[];
  id: string;
}

export interface OrderDetail {
  productId: string;
  title: string;
  price: number;
  quantity: number;
}
