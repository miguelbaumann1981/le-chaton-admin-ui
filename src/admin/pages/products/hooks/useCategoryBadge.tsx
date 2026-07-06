import type { Category } from '../types/category.type';

export const useCategoryBadge = (category: Category): string => {
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
  return '';
};
