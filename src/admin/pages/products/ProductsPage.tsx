import { MdOutlineSearch, MdStorefront } from 'react-icons/md';
import { useI18n } from '../../../i18n';
import { useProducts } from './hooks/useProducts';
import type { Product } from './interfaces/products-api-response.interface';
import { Paginator } from '../../components/Paginator';
import { Spinner } from '../../components/Spinner';
import { useState } from 'react';
import type { Category } from './types/category.type';
import { useCategoryTranslation } from './hooks/useCategoryTranslation';
import type { Language } from './types/language.type';

export const ProductsPage = () => {
  const { t } = useI18n();
  const [customLimit, setCustomLimit] = useState(7);
  const [customCategory, setCustomCategory] = useState<Category>('');
  const [language, setLanguage] = useState<Language>('');
  const { data, isLoading, error } = useProducts(
    customLimit,
    customCategory,
    language,
  );

  const productsData: Product[] = data?.products || [];
  const totalResults = data?.total || 0;

  const totalPages =
    data?.total && data?.limit ? Math.ceil(data.total / data.limit) : 0;

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

  const handleCategoryFilter = (category: Category) => {
    if (category === '') {
      setCustomLimit(7);
      setCustomCategory('');
      setLanguage('');
      return;
    }
    setCustomLimit(1000);
    setCustomCategory(category);
  };

  const handleLanguageFilter = (lang: Language) => {
    if (lang === '') {
      setLanguage('');
      return;
    }
    setCustomLimit(1000);
    setCustomCategory(customCategory);
    setLanguage(lang);
  };

  return (
    <>
      <div className='flex flex-col gap-5'>
        <h1 className='text-4xl font-bold mb-4 flex items-center gap-2'>
          <MdStorefront /> {t('menu.products')}
        </h1>

        {/* FILTROS */}
        <div className='flex flex-row justify-between items-center'>
          <div className='flex gap-2'>
            <button
              className={`btn btn-warning ${customCategory === 'CAKES' ? 'btn-outline' : 'btn-soft'}`}
              onClick={() => handleCategoryFilter('CAKES')}
            >
              {useCategoryTranslation('CAKES')}
            </button>
            <button
              className={`btn btn-info ${customCategory === 'BISCUITS' ? 'btn-outline' : 'btn-soft'}`}
              onClick={() => handleCategoryFilter('BISCUITS')}
            >
              {useCategoryTranslation('BISCUITS')}
            </button>
            <button
              className={`btn  btn-primary ${customCategory === 'ROSCONES' ? 'btn-outline' : 'btn-soft'}`}
              onClick={() => handleCategoryFilter('ROSCONES')}
            >
              {useCategoryTranslation('ROSCONES')}
            </button>
            <button
              className={`btn  btn-success ${customCategory === 'VEGAN' ? 'btn-outline' : 'btn-soft'}`}
              onClick={() => handleCategoryFilter('VEGAN')}
            >
              {useCategoryTranslation('VEGAN')}
            </button>
            <button
              className='btn btn-soft btn-neutral text-base-content'
              onClick={() => handleCategoryFilter('')}
            >
              Todos
            </button>
          </div>

          <div className='flex items-center gap-2'>
            <button
              className={`btn ${language === 'es' ? 'btn-outline' : 'btn-soft'} `}
              onClick={() => handleLanguageFilter('es')}
            >
              <img
                src='/images/spain-flag.png'
                alt='Spain flag icon'
                className='h-5'
              />
            </button>
            <button
              className={`btn ${language === 'en' ? 'btn-outline' : 'btn-soft'} `}
              onClick={() => handleLanguageFilter('en')}
            >
              <img
                src='/images/uk-flag.png'
                alt='UK flag icon'
                className='h-5'
              />
            </button>
            <button
              className='btn btn-soft btn-neutral text-base-content'
              onClick={() => handleLanguageFilter('')}
            >
              Reset
            </button>
          </div>

          <div className='flex gap-2 items-center'>
            <button className='btn  btn-neutral'>
              <MdOutlineSearch /> Buscador
            </button>
          </div>

          <div className='flex items-center gap-2'>
            <span>Resultados</span>
            <span className='badge badge-outline badge-accent'>
              {totalResults}
            </span>
          </div>
        </div>

        {error && (
          <div className='w-full border border-red-100 p-5 text-center'>
            Ocurrió un error al cargar los productos.
          </div>
        )}

        {isLoading && !error ? (
          <Spinner />
        ) : (
          <div className='card bg-base-300 border border-gray-600 rounded-t-lg'>
            <div
              className={`overflow-x-auto ${customLimit === 1000 ? 'max-h-150' : ''}`}
            >
              <table className='table table-zebra '>
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
                  {productsData.length === 0 && (
                    <div className='w-full p-5 text-center text-xl text-white'>
                      {t('products.noProducts')}
                    </div>
                  )}

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
            </div>
          </div>
        )}

        {totalPages > 1 && (
          <div className='flex justify-between items-center my-4 border-t-gray-600'>
            <Paginator totalPages={totalPages} />

            <div className='flex gap-2 items-center'>
              <span className='text-sm'>Resultados por página</span>
              <input
                type='number'
                placeholder='Introduzca límite...'
                className='input w-18 text-center'
                value={customLimit}
                onChange={(e) => setCustomLimit(Number(e.target.value))}
              />
            </div>
          </div>
        )}
      </div>

      {productsData.map((product) => (
        <dialog key={product.id} id={product.id} className='modal'>
          <div className='modal-box flex flex-col gap-4'>
            <h3 className='font-bold text-xl text-white'>{product.title}</h3>
            <img
              src={product?.image}
              alt={product?.title}
              className='w-full rounded-xl border border-gray-400'
            />

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
              <button className='btn btn-outline btn-secondary'>
                {t('common.close')}
              </button>
            </form>
          </div>
        </dialog>
      ))}
    </>
  );
};
