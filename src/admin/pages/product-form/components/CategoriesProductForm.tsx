import { useI18n } from '../../../../i18n';
import type { Category } from '../../products/types/category.type';

interface Props {
  category: Category;
}

export const CategoriesProductForm = ({ category }: Props) => {
  const { t } = useI18n();
  const cakesValue: Category = 'CAKES';
  const biscuitsValue: Category = 'BISCUITS';
  const rosconesValue: Category = 'ROSCONES';
  const veganValue: Category = 'VEGAN';

  return (
    <div className='flex flex-col gap-2 w-full'>
      <label className='text-sm'>{t('products.category')}</label>
      <div className='flex gap-5 flex-wrap'>
        <div className='flex items-center gap-3'>
          <input
            type='radio'
            name='categories'
            value={cakesValue}
            className='radio radio-sm radio-primary'
            checked={category === 'CAKES'}
            disabled={category !== 'CAKES'}
          />
          <span
            className={`badge badge-soft ${category === 'CAKES' ? 'badge-warning' : ''}`}
          >
            {t('products.cakes')}
          </span>
        </div>
        <div className='flex items-center gap-3'>
          <input
            type='radio'
            name='categories'
            value={biscuitsValue}
            className='radio radio-sm radio-primary'
            checked={category === 'BISCUITS'}
            disabled={category !== 'BISCUITS'}
          />
          <span
            className={`badge badge-soft ${category === 'BISCUITS' ? 'badge-info' : ''}`}
          >
            {t('products.biscuits')}
          </span>
        </div>
        <div className='flex items-center gap-3'>
          <input
            type='radio'
            name='categories'
            value={rosconesValue}
            className='radio radio-sm radio-primary'
            checked={category === 'ROSCONES'}
            disabled={category !== 'ROSCONES'}
          />
          <span
            className={`badge badge-soft ${category === 'ROSCONES' ? 'badge-primary' : ''}`}
          >
            {t('products.roscones')}
          </span>
        </div>
        <div className='flex items-center gap-3'>
          <input
            type='radio'
            name='categories'
            value={veganValue}
            className='radio radio-sm radio-primary'
            checked={category === 'VEGAN'}
            disabled={category !== 'VEGAN'}
          />
          <span
            className={`badge badge-soft ${category === 'VEGAN' ? 'badge-success' : ''}`}
          >
            {t('products.vegan')}
          </span>
        </div>
      </div>
    </div>
  );
};
