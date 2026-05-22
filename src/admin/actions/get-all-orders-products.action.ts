import { leChatonApi } from '../../api/leChatonApi';
import type { ProductsOrdersApiResponse } from '../interfaces/products-orders-api-response.interface';

export const getAllOrdersProductsAction =
  async (): Promise<ProductsOrdersApiResponse> => {
    const { data } = await leChatonApi.get<ProductsOrdersApiResponse>(
      '/orders/products-summary',
    );

    return { productsOrders: data.productsOrders };
  };
