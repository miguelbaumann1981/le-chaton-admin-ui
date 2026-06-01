import { MdDashboard } from 'react-icons/md';
import { useI18n } from '../../../i18n';
import { useProducts } from './hooks/useProducts';
import type { Product } from './interfaces/products-api-response.interface';

export const ProductsPage = () => {
  const { t } = useI18n();

  const { data, isLoading, error } = useProducts();
  console.log(isLoading, error);

  const productsData: Product[] = data?.products || [];

  return (
    <div className='flex flex-col gap-5'>
      <h1 className='text-4xl font-bold mb-4 flex items-center gap-2'>
        <MdDashboard /> {t('menu.products')}
      </h1>

      <div className='w-full border border-green-100 p-5'>FILTROS</div>

      <div className='card bg-base-300 border border-gray-600 p-5'>
        <div className='overflow-x-auto'>
          <table className='table table-zebra'>
            {/* head */}
            <thead>
              <tr>
                <th className='border-b border-gray-600'>ID producto</th>
                <th className='border-b border-gray-600'>Producto</th>
                <th className='border-b border-gray-600'>Nombre</th>
                <th className='border-b border-gray-600'>Precio</th>
                <th className='border-b border-gray-600'>Categoría</th>
                <th className='border-b border-gray-600'>Ver detalles</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}

              {productsData.map((product) => (
                <tr key={product.id} className='hover:bg-accent-content'>
                  <td className='border-bottom border-gray-600'>
                    {product.id}
                  </td>

                  <td className='border-bottom border-gray-600'>
                    <div className='flex items-center gap-3'>
                      <div className='avatar'>
                        <div className='mask mask-squircle h-12 w-12'>
                          <img src={product?.image} alt={product?.title} />
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className='border-bottom border-gray-600'>
                    {product.title}
                  </td>

                  <td className='border-bottom border-gray-600'>
                    ${product.price.toFixed(2)}
                  </td>
                  <td className='border-bottom border-gray-600'>
                    {product.category}
                  </td>
                  <th className='border-bottom border-gray-600'>
                    <button className='btn btn-ghost btn-xs'>details</button>
                  </th>
                </tr>
              ))}
            </tbody>
            {/* foot */}
          </table>

          <div className='w-full border-t  border-gray-600'>Paginador</div>
        </div>
      </div>
    </div>
  );
};
