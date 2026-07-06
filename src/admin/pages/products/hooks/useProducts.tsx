import { useSearchParams } from 'react-router';
import { getProductsAction } from '../actions/get-products.action';
import { useQuery } from '@tanstack/react-query';
import type { Category } from '../types/category.type';
import type { Language } from '../types/language.type';

export const useProducts = (
  customLimit: number,
  customCategory: Category,
  language: Language,
) => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;
  const limit = searchParams.get('limit') || customLimit;
  const category = searchParams.get('category') || customCategory;

  return useQuery({
    queryKey: [
      'products',
      {
        page,
        limit,
        category: customCategory,
        language,
      },
    ],
    queryFn: () =>
      getProductsAction({
        page,
        limit,
        category,
        language,
      }),
    staleTime: 1000 * 60 * 5,
  });
};
