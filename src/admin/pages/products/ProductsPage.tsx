import { MdDashboard } from 'react-icons/md';
import { useI18n } from '../../../i18n';
import { useProducts } from './hooks/useProducts';
import type { Product } from './interfaces/products-api-response.interface';

export const ProductsPage = () => {
  const { t } = useI18n();

  const { data, isLoading } = useProducts();

  const productsData: Product[] = data?.products || [];

  const handleBadgeCategory = (category: string) => {
    switch (category) {
      case 'CAKES':
        return 'badge-warning';
      case 'BISCUITS':
        return 'badge-info';
      case 'ROSCONES':
        return 'badge-primary';
      case 'VEGAN':
        return 'badge-success';
    }
  };

  return (
    <>
      <div className='flex flex-col gap-5'>
        <h1 className='text-4xl font-bold mb-4 flex items-center gap-2'>
          <MdDashboard /> {t('menu.products')}
        </h1>

        <div className='w-full border border-green-100 p-5'>FILTROS</div>

        {isLoading ? (
          <div className='w-full border border-yellow-100 p-5'>Cargando...</div>
        ) : (
          <div className='card bg-base-300 border border-gray-600 rounded-t-lg'>
            <div className='overflow-x-auto'>
              <table className='table table-zebra'>
                {/* head */}
                <thead>
                  <tr className='bg-white/10 text-white'>
                    <th className='border-b-gray-600'>
                      {t('products.idProduct')}
                    </th>
                    <th className='border-b-gray-600'>
                      {t('products.product')}
                    </th>
                    <th className='border-b-gray-600'>{t('products.name')}</th>
                    <th className='border-b-gray-600'>{t('products.price')}</th>
                    <th className='border-b-gray-600'>
                      {t('products.category')}
                    </th>
                    <th className='border-b-gray-600'>
                      {t('products.language')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {productsData.map((product) => (
                    <tr
                      key={product.id}
                      className='cursor-pointer hover:bg-accent-content'
                      onClick={() => {
                        const dialog = document.getElementById(
                          product.id,
                        ) as HTMLDialogElement | null;
                        dialog?.showModal();
                      }}
                    >
                      <td className='border-b-gray-600'>{product.id}</td>

                      <td className='border-b-gray-600'>
                        <div className='flex items-center gap-3'>
                          <div className='avatar'>
                            <div className='mask mask-squircle h-12 w-12'>
                              <img src={product?.image} alt={product?.title} />
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className='border-b-gray-600'>{product.title}</td>

                      <td className='border-b-gray-600'>
                        <span className='text-primary'>
                          ${product.price.toFixed(2)}
                        </span>
                      </td>

                      <td className='border-b-gray-600'>
                        <span
                          className={`badge badge-soft ${handleBadgeCategory(product.category)}`}
                        >
                          {t(product.category)}
                        </span>
                      </td>

                      <td className='border-b-gray-600'>
                        <img
                          src={
                            product.language === 'en'
                              ? '/images/uk-flag.png'
                              : '/images/spain-flag.png'
                          }
                          alt={
                            product.language === 'en'
                              ? 'UK flag icon'
                              : 'Spain flag icon'
                          }
                          className='h-5'
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className='w-full border-t  border-gray-600'>Paginador</div>
            </div>
          </div>
        )}
      </div>

      {productsData.map((product) => (
        <dialog key={product.id} id={product.id} className='modal'>
          <div className='modal-box flex flex-col gap-4'>
            <h3 className='font-bold text-xl'>{product.title}</h3>
            <img src={product?.image} alt={product?.title} className='w-full' />

            <div className='flex justify-between items-center max-lg:flex-col max-lg:justify-start max-lg:items-start'>
              <div className='flex items-center gap-3'>
                <span
                  className={`text-base badge badge-soft ${handleBadgeCategory(product.category)}`}
                >
                  {t(product.category)}
                </span>

                {product.pack && (
                  <div className='border-2 border-error rounded-full px-2 py-1 bg-white flex baseline gap-1 text-info-content'>
                    <span className='font-bold'>{product.pack}</span>
                    <span className='text-xs'>u</span>
                  </div>
                )}

                {product.weight && (
                  <span className='badge badge-outline'>{product.weight}</span>
                )}
              </div>

              <div className='badge badge-primary font-bold'>
                ${product.price.toFixed(2)}
              </div>
            </div>

            <p>{product.description}</p>

            {product.ingredients && (
              <div className='flex flex-col gap-2'>
                <div className='flex flex-row flex-wrap gap-2 my-2'>
                  {product.ingredients.map((ingredient, index) => (
                    <span key={index} className='badge badge-outline '>
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <form method='dialog' className='flex flex-row-reverse gap-2 mt-5'>
              <button className='btn btn-secondary'>{t('common.close')}</button>
            </form>
          </div>
        </dialog>
      ))}
    </>
  );
};
