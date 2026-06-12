import { useRef, useState } from 'react';
import { useI18n } from '../../../../i18n';
import { Spinner } from '../../../components/Spinner';
import { MdOutlineWarning } from 'react-icons/md';
import type { SearchOrderMode } from '../../products/types/search-mode.type';
import { useOrderByArgument } from '../hooks/useOrderByArgument';
import type { Order } from '../interfaces/order.interface';
import { OrderDetailsModal } from './OrderDetailsModal';
import { useOrderById } from '../hooks/useOrderById';

interface Props {
  idRef: string;
}

export const SearchOrderModal = ({ idRef }: Props) => {
  const { t } = useI18n();
  const search = useRef<HTMLInputElement>(null);

  const [searchMode, setSearchMode] = useState<SearchOrderMode>('');
  const [querySearch, setQuerySearch] = useState<string>('');
  const [placeholder, setPlaceholder] = useState<string>(t('common.search'));
  const [disableReset, setDisableReset] = useState<boolean>(true);
  const [selectedId, setSelectedId] = useState('');

  const idArgument = searchMode === 'id' ? querySearch : '';
  const dateArgument = searchMode === 'date' ? querySearch : '';
  const nameArgument = searchMode === 'name' ? querySearch : '';

  const { data, isLoading, error } = useOrderByArgument(
    idArgument,
    dateArgument,
    nameArgument,
  );

  const { data: orderData } = useOrderById(selectedId ?? '');

  const results: Order[] = data?.orders || [];
  const showResults: boolean =
    results &&
    results.length > 0 &&
    !isLoading &&
    !error &&
    searchMode !== '' &&
    querySearch !== '';

  const handleRadioSelection = (mode: SearchOrderMode) => {
    if (mode === '') return;

    setDisableReset(true);
    setSearchMode(mode);
    setQuerySearch('');
    setSelectedId('');

    if (search.current) {
      search.current.value = '';
    }

    switch (mode) {
      case 'id':
        setPlaceholder(t('common.searchById'));
        break;
      case 'date':
        setPlaceholder(t('common.searchByDate'));
        break;
      case 'name':
        setPlaceholder(t('common.searchByName'));
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
      setSelectedId('');
    }
  };

  const handleInputValues = (value: string) => {
    if (!value || value === '') {
      setDisableReset(true);
    } else {
      setDisableReset(false);
    }
  };

  const onNavigateModal = (order: Order) => {
    setSelectedId(order?.id);

    const dialog = document.getElementById(
      order?.id,
    ) as HTMLDialogElement | null;
    dialog?.showModal();
  };

  const getLabelBySearchMode = (
    mode: SearchOrderMode,
    order: Order,
  ): string => {
    switch (mode) {
      case 'id':
        return order?.id;
      case 'date':
        return order?.orderDate?.toLocaleString?.().slice(0, 10);
      case 'name':
        return order?.description;
      default:
        return order?.description;
    }
  };

  return (
    <>
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
                name='searchOrder'
                className={`radio ${searchMode === 'id' ? 'radio-primary' : ''}`}
                value='id'
                onChange={() => handleRadioSelection('id')}
              />
              <span>{t('products.byId')}</span>
            </div>

            <div className='flex items-center gap-2'>
              <input
                type='radio'
                name='searchOrder'
                className={`radio ${searchMode === 'date' ? 'radio-primary' : ''}`}
                value='date'
                onChange={() => handleRadioSelection('date')}
              />
              <span>{t('products.byDate')}</span>
            </div>

            <div className='flex items-center gap-2'>
              <input
                type='radio'
                name='searchOrder'
                className={`radio ${searchMode === 'name' ? 'radio-primary' : ''}`}
                value='name'
                onChange={() => handleRadioSelection('name')}
              />
              <span>{t('products.byName')}</span>
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
              <h4 className='font-semibold'>{t('common.results')}</h4>
              <ul className='max-h-75 overflow-auto'>
                {results.map((order) => (
                  <li
                    key={order?.id}
                    className='custom-link'
                    onClick={() => onNavigateModal(order)}
                  >
                    {getLabelBySearchMode(searchMode, order)}
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
              <button className='btn btn-outline'>{t('common.close')}</button>
            </form>
          </div>
        </div>
      </dialog>

      <OrderDetailsModal {...orderData!} />
    </>
  );
};
