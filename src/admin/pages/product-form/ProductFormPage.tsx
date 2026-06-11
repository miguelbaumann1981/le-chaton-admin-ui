import { useParams } from 'react-router';
import type { Product } from '../products/interfaces/products-api-response.interface';
import { useI18n } from '../../../i18n';
import { MdOutlinePlaylistAddCheck, MdOutlineSearch } from 'react-icons/md';
import { CategoriesProductForm } from './components/CategoriesProductForm';
import { LanguagesProductForm } from './components/LanguagesProductForm';
import { IngredientsProductForm } from './components/IngredientsProductForm';
import type { Language } from '../products/types/language.type';
import { useState } from 'react';
import { Spinner } from '../../components/Spinner';
import { SearchProductModal } from '../products/components/SearchProductModal';
import { useProductBySlug } from '../products/hooks/useProductBySlug';

export const ProductFormPage = () => {
  const { t } = useI18n();
  const { slug } = useParams();
  const { data, isLoading, error } = useProductBySlug(slug || '');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('');

  const product: Product = data || ({} as Product);
  const activeLang: Language = product?.language ?? selectedLanguage;
  const styleInputs: string = 'bg-base-300 text-white';

  const handleReturn = () => {
    const dialog = document.getElementById(
      'repeatSearch',
    ) as HTMLDialogElement | null;
    dialog?.showModal();
  };

  const onSubmitLanguage = (lang: Language) => {
    setSelectedLanguage(lang);
  };

  return (
    <>
      {isLoading && !error ? (
        <div className='flex flex-col justify-center items-center h-100'>
          <Spinner />
        </div>
      ) : (
        <div className='flex flex-col gap-5'>
          {/* TITLE */}
          <div className='flex items-center justify-between'>
            <h1 className='text-3xl font-bold mb-4 flex items-center gap-2'>
              <MdOutlinePlaylistAddCheck /> {product?.title}
            </h1>

            <button className='btn btn-neutral' onClick={() => handleReturn()}>
              <MdOutlineSearch /> {t('common.searcher')}
            </button>
          </div>

          {/* BODY */}
          <div className='grid grid-cols-2 gap-10'>
            {/* FIELDS */}
            <div className='flex flex-col gap-5'>
              <div className='flex gap-5'>
                {/* ID */}
                <div className='flex flex-col gap-1 w-1/2'>
                  <label className='text-sm'>{t('products.idProduct')}</label>
                  <input
                    type='text'
                    className={`input ${styleInputs} w-full`}
                    placeholder={`${t('common.typeHere')} ${t('products.idProduct')}...`}
                    value={product?.id}
                    readOnly
                  />
                </div>

                {/* SLUG */}
                <div className='flex flex-col gap-1 w-1/2'>
                  <label className='text-sm'>{t('products.slug')}</label>
                  <input
                    type='text'
                    className={`input ${styleInputs} w-full`}
                    placeholder={`${t('common.typeHere')} ${t('products.slug')}...`}
                    value={product?.slug}
                    readOnly
                  />
                </div>
              </div>

              <div className='flex gap-5'>
                {/* NAME */}
                <div className='flex flex-col gap-1 w-1/2'>
                  <label className='text-sm'>{t('products.name')}</label>
                  <input
                    type='text'
                    className={`input ${styleInputs} w-full`}
                    placeholder={`${t('common.typeHere')} ${t('products.name')}...`}
                    value={product?.title}
                    readOnly
                  />
                </div>

                {/* LANGUAGE */}
                <LanguagesProductForm
                  language={activeLang}
                  onLanguage={() => onSubmitLanguage}
                />
              </div>

              {/* DESCRIPTION */}
              <div className='flex flex-col gap-1 w-full'>
                <label className='text-sm'>{t('products.description')}</label>
                <textarea
                  className={`textarea h-24 ${styleInputs} w-full`}
                  placeholder={`${t('common.typeHere')} ${t('products.description')}...`}
                  value={product?.description}
                  readOnly
                ></textarea>
              </div>

              <div className='flex gap-5'>
                {/* PRICE */}
                <div className='flex flex-col gap-1 w-1/3'>
                  <label className='text-sm'>{t('products.price')} (€)</label>
                  <input
                    type='number'
                    className={`input ${styleInputs} w-full`}
                    placeholder={`${t('common.typeHere')} ${t('products.price')}...`}
                    value={product?.price}
                    readOnly
                  />
                </div>

                {/* PACK */}
                <div className='flex flex-col gap-1 w-1/3'>
                  <label className='text-sm'>{t('products.pack')} (uds)</label>
                  <input
                    type='number'
                    className={`input bg-base-300 w-full ${product?.pack === null ? 'text-base-content italic' : 'text-white'}`}
                    placeholder={`${t('common.typeHere')} ${t('products.pack')}...`}
                    value={product?.pack ?? t('common.noApply')}
                    disabled={product?.pack === null}
                    readOnly
                  />
                </div>

                {/* WEIGHT */}
                <div className='flex flex-col gap-1 w-1/3'>
                  <label className='text-sm'>{t('products.weight')}</label>
                  <input
                    type='text'
                    className={`input bg-base-300 w-full ${product?.weight === null ? 'text-base-content italic' : 'text-white'}`}
                    placeholder={`${t('common.typeHere')} ${t('products.weight')}...`}
                    value={product?.weight ?? t('common.noApply')}
                    disabled={product?.weight === null}
                    readOnly
                  />
                </div>
              </div>

              {/* INGREDIENTS */}
              <IngredientsProductForm ingredients={product?.ingredients} />

              {/* CATEGORIES */}
              <CategoriesProductForm category={product?.category} />
            </div>

            {/* IMAGE */}
            <div className='w-full'>
              <img
                src={product?.image}
                alt={product?.title}
                className='w-full rounded-lg border border-gray-500 object-cover'
              />
            </div>
          </div>
        </div>
      )}
      {error && <div className='text-error'>{t('comomon.serverError')}</div>}

      {/* Modal for Searcher */}
      <SearchProductModal idRef='repeatSearch' />
    </>
  );
};
