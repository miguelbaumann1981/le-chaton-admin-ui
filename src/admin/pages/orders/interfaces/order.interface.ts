import type { OrderStatus } from '../types/order-status.type';

export interface Order {
  id: string;
  orderDate: Date | string;
  userId: string;
  description: string;
  totalPrice: number;
  status: OrderStatus;
  details: OrderDetail[];
}

export interface OrderDetail {
  productId: string;
  title: string;
  price: number;
  quantity: number;
}
