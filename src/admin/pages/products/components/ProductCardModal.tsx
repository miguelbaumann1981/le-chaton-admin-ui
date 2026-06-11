import { NumericFormat } from 'react-number-format';
import { useI18n } from '../../../../i18n';
import type { Product } from '../interfaces/products-api-response.interface';

export const ProductCardModal = (product: Product) => {
  const { t } = useI18n();

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
    <dialog id={product.id} className='modal'>
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
            <NumericFormat
              value={product?.price}
              thousandSeparator='.'
              decimalSeparator=','
              suffix={' €'}
              decimalScale={2}
              fixedDecimalScale={true}
              displayType='text'
            />
          </div>
        </div>

        <p>{product.description}</p>

        {product.ingredients && (
          <div className='flex flex-col gap-2'>
            <div className='flex flex-row flex-wrap gap-2 my-2'>
              {product.ingredients.map((ingredient, index) => (
                <span key={index} className='badge badge-soft badge-warning'>
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
        )}

        <form method='dialog' className='flex flex-row-reverse gap-2 mt-5'>
          <button className='btn btn-outline'>{t('common.close')}</button>
        </form>
      </div>
    </dialog>
  );
};
