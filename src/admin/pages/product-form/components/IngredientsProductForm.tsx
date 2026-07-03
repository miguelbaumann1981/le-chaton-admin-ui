import { useI18n } from '../../../../i18n';

interface Props {
  ingredients: string[];
}

export const IngredientsProductForm = ({ ingredients }: Props) => {
  const { t } = useI18n();

  return (
    <div className='flex flex-col gap-1 w-full'>
      <label className='text-sm'>{t('products.ingredients')}</label>
      <div className='flex flex-wrap gap-2'>
        {ingredients?.map((ingredient) => (
          <input
            key={ingredient}
            type='text'
            className='input w-fit bg-base-300 text-white'
            placeholder={`${t('common.typeHere')} ${t('products.ingredients')}...`}
            value={ingredient}
            readOnly
          />
        ))}
      </div>
    </div>
  );
};
