import type { Category } from '../types/category.type';
import type { Language } from '../types/language.type';

export interface ProductsApiResponse {
  page: number;
  limit: number;
  total: number;
  next: string | null;
  previous: string | null;
  products: Product[];
}

export interface Product {
  title: string;
  slug: string;
  category: Category;
  description: string;
  price: number;
  ingredients: string[];
  image: string;
  language: Language;
  pack: number;
  weight: null | string;
  id: string;
}
