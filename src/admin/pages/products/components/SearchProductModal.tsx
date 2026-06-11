import { useRef, useState } from 'react';
import { useI18n } from '../../../../i18n';
import { useProductByArgument } from '../hooks/useProductByArgument';
import type { Product } from '../interfaces/products-api-response.interface';
import { Spinner } from '../../../components/Spinner';
import { Link } from 'react-router';
import { MdOutlineWarning } from 'react-icons/md';
import type { SearchMode } from '../types/search-mode.type';

interface Props {
  idRef: string;
}

export const SearchProductModal = ({ idRef }: Props) => {
  const { t } = useI18n();
  const search = useRef<HTMLInputElement>(null);

  const [searchMode, setSearchMode] = useState<SearchMode>('');
  const [querySearch, setQuerySearch] = useState<string>('');
  const [placeholder, setPlaceholder] = useState<string>(t('common.search'));
  const [disableReset, setDisableReset] = useState<boolean>(true);

  const idArgument = searchMode === 'id' ? querySearch : '';
  const slugArgument = searchMode === 'slug' ? querySearch : '';
  const titleArgument = searchMode === 'title' ? querySearch : '';

  const { data, isLoading, error } = useProductByArgument(
    idArgument,
    slugArgument,
    titleArgument,
  );
  const results: Product[] = data?.products || [];
  const showResults: boolean =
    results &&
    results.length > 0 &&
    !isLoading &&
    !error &&
    searchMode !== '' &&
    querySearch !== '';

  const handleRadioSelection = (mode: SearchMode) => {
    if (mode === '') return;

    setDisableReset(true);
    setSearchMode(mode);
    setQuerySearch('');

    if (search.current) {
      search.current.value = '';
    }

    switch (mode) {
      case 'id':
        setPlaceholder(t('common.searchById'));
        break;
      case 'slug':
        setPlaceholder(t('common.searchBySlug'));
        break;
      case 'title':
        setPlaceholder(t('common.searchByTitle'));
        break;
    }
  };

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;

    const query = search.current?.value;
    if (!query) return;

    setQuerySearch(query);
  };

  const resetFilters = () => {
    if (search.current) {
      search.current.value = '';
      setDisableReset(true);
      setQuerySearch('');
      localStorage.removeItem('search');
    }
  };

  const handleInputValues = (value: string) => {
    if (!value || value === '') {
      setDisableReset(true);
    } else {
      setDisableReset(false);
    }
  };

  const onCloseDialog = () => {
    const dialog = document.getElementById(idRef) as HTMLDialogElement | null;
    dialog?.close();
  };

  return (
    <dialog id={idRef} className='modal'>
      <div className='modal-box flex flex-col gap-3'>
        <h3 className='font-bold text-xl text-white mb-3'>
          {t('common.searcher')}
        </h3>

        {/* Radio-buttons */}
        <div className='flex gap-6 items-center'>
          <div className='flex items-center gap-2'>
            <input
              type='radio'
              name='searchProduct'
              className={`radio ${searchMode === 'id' ? 'radio-primary' : ''}`}
              value='id'
              onChange={() => handleRadioSelection('id')}
            />
            <span>{t('products.byId')}</span>
          </div>

          <div className='flex items-center gap-2'>
            <input
              type='radio'
              name='searchProduct'
              className={`radio ${searchMode === 'slug' ? 'radio-primary' : ''}`}
              value='slug'
              onChange={() => handleRadioSelection('slug')}
            />
            <span>{t('products.bySlug')}</span>
          </div>

          <div className='flex items-center gap-2'>
            <input
              type='radio'
              name='searchProduct'
              className={`radio ${searchMode === 'title' ? 'radio-primary' : ''}`}
              value='title'
              onChange={() => handleRadioSelection('title')}
            />
            <span>{t('products.byTitle')}</span>
          </div>
        </div>

        {/* Input search */}
        <div className='w-full'>
          <input
            type='text'
            ref={search}
            placeholder={`${placeholder}...`}
            className='input input-xl w-full'
            onKeyDown={handleSearch}
            onInput={() => handleInputValues(search.current?.value || '')}
            disabled={searchMode === ''}
          />
        </div>

        {/* Results */}
        {isLoading && (
          <div className='w-full h-12.5 flex flex-col items-center justify-center'>
            <Spinner />
          </div>
        )}

        {showResults && (
          <div className='flex flex-col gap-2 mt-3'>
            <h4 className='font-semibold'>Resultados</h4>
            <ul className='max-h-75 overflow-auto'>
              {results.map((product) => (
                <li key={product?.id} onClick={() => onCloseDialog()}>
                  {searchMode === 'id' && (
                    <Link
                      className='custom-link'
                      to={`/product/${product?.slug}`}
                    >
                      {' '}
                      {product?.id}{' '}
                    </Link>
                  )}

                  {searchMode === 'slug' && (
                    <Link
                      className='custom-link'
                      to={`/product/${product?.slug}`}
                    >
                      {' '}
                      {product?.slug}{' '}
                    </Link>
                  )}

                  {searchMode === 'title' && (
                    <Link
                      className='custom-link'
                      to={`/product/${product?.slug}`}
                    >
                      {' '}
                      {product?.title}{' '}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
        {results.length === 0 && !isLoading && !error && (
          <p className='text-info'>{t('products.noResults')}</p>
        )}

        {error && (
          <div className='flex items-center gap-2 text-error'>
            <MdOutlineWarning /> <span> {t('common.serverError')}</span>
          </div>
        )}

        {/* Button close */}
        <div className='modal-action flex items-center gap-2'>
          <button
            className='btn btn-outline btn-info'
            disabled={disableReset}
            onClick={() => resetFilters()}
          >
            {t('common.reset')}
          </button>
          <form method='dialog'>
            <button className='btn btn-outline btn-error'>
              {t('common.close')}
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};
