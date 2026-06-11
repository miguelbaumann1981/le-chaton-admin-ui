import type { SearchMode } from '../types/search-mode.type';

export interface ItemSearchLocalStorage {
  mode: SearchMode;
  query: string;
}
