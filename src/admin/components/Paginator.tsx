import {
  MdFirstPage,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdLastPage,
} from 'react-icons/md';
import { useSearchParams } from 'react-router';

interface Props {
  totalPages: number;
}

export const Paginator = ({ totalPages }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryPage = searchParams.get('page') ?? '1';
  const page = isNaN(+queryPage) ? 1 : Number(queryPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;

    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };

  return (
    <div className='join'>
      <button
        className='join-item btn btn-outline'
        onClick={() => handlePageChange(1)}
        disabled={page === 1}
      >
        <MdFirstPage size={20} />
      </button>

      <button
        className='join-item btn btn-outline'
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
      >
        <MdKeyboardArrowLeft size={20} />
      </button>

      <button className='join-item btn btn-outline cursor-default'>
        {page}
      </button>

      <button
        className='join-item btn btn-outline'
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
      >
        <MdKeyboardArrowRight size={20} />
      </button>

      <button
        className='join-item btn btn-outline'
        onClick={() => handlePageChange(totalPages)}
        disabled={page === totalPages}
      >
        <MdLastPage size={20} />
      </button>
    </div>
  );
};
