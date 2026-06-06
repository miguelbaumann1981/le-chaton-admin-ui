import { useI18n } from '../../../../i18n';
import type { Category } from '../types/category.type';

export const useCategoryTranslation = (category: Category): string => {
  const { t } = useI18n();

  switch (category) {
    case 'CAKES':
      return t('products.cakes');
    case 'BISCUITS':
      return t('products.biscuits');
    case 'ROSCONES':
      return t('products.roscones');
    case 'VEGAN':
      return t('products.vegan');
  }
  return '';
};
