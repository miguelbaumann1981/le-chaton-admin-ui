import { useNavigate, useParams } from 'react-router';
import { useProductByArgument } from '../products/hooks/useProductByArgument';
import type { Product } from '../products/interfaces/products-api-response.interface';
import { useI18n } from '../../../i18n';
import { MdStar } from 'react-icons/md';

export const ProductFormPage = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { slug } = useParams();
  const { data, isLoading, error } = useProductByArgument('', slug);
  const product: Product = data?.products[0] || ({} as Product);
  console.log(product);
  const styleInputs: string = 'bg-base-300 text-white';

  const handleReturn = () => {
    navigate('/products');
  };

  return (
    <>
      <div className='flex flex-col gap-5'>
        {/* TITLE */}
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold mb-4 flex items-center gap-2'>
            <MdStar /> {product?.title}
          </h1>

          <button className='btn btn-neutral' onClick={() => handleReturn()}>
            Volver
          </button>
        </div>

        {/* BODY */}
        <div className='grid grid-cols-2 gap-10'>
          {/* FIELDS */}
          <div className='flex flex-col gap-5'>
            <div className='flex gap-5'>
              <div className='flex flex-col gap-1 w-1/2'>
                <label className='text-sm'>ID</label>
                <input
                  type='text'
                  className={`input ${styleInputs} w-full`}
                  placeholder='Type here'
                  value={product?.id}
                  readOnly
                />
              </div>

              <div className='flex flex-col gap-1 w-1/2'>
                <label className='text-sm'>Slug</label>
                <input
                  type='text'
                  className={`input ${styleInputs} w-full`}
                  placeholder='Type here'
                  value={product?.slug}
                  readOnly
                />
              </div>
            </div>

            <div className='flex gap-5'>
              <div className='flex flex-col gap-1 w-1/2'>
                <label className='text-sm'>Nombre</label>
                <input
                  type='text'
                  className={`input ${styleInputs} w-full`}
                  placeholder='Type here'
                  value={product?.title}
                  readOnly
                />
              </div>

              <div className='flex flex-col gap-1 w-1/2'>
                <label className='text-sm'>Precio</label>
                <input
                  type='number'
                  className={`input ${styleInputs} w-full`}
                  placeholder='Type here'
                  value={product?.price}
                  readOnly
                />
              </div>
            </div>

            <div className='flex flex-col gap-1 w-full'>
              <label className='text-sm'>Descripción</label>
              <textarea
                className={`textarea h-24 ${styleInputs} w-full`}
                placeholder='Bio'
                value={product?.description}
                readOnly
              ></textarea>
            </div>

            <div className='flex flex-col gap-1 w-full'>
              <label className='text-sm'>Categoria</label>
              <div className='flex gap-5'>
                <div className='flex items-center gap-3'>
                  <input
                    type='radio'
                    name='categories'
                    className='radio radio-primary'
                    defaultChecked
                  />
                  <span>Galletas</span>
                </div>
                <div className='flex items-center gap-3'>
                  <input
                    type='radio'
                    name='categories'
                    className='radio radio-primary'
                    disabled
                  />
                  <span>Tartas</span>
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-1 w-full'>
              <label className='text-sm'>Idioma</label>
              <div className='flex gap-5'>
                <div className='flex items-center gap-3'>
                  <input
                    type='radio'
                    name='language'
                    className='radio radio-primary'
                    defaultChecked
                  />
                  <span>ESP</span>
                </div>
                <div className='flex items-center gap-3'>
                  <input
                    type='radio'
                    name='language'
                    className='radio radio-primary'
                    disabled
                  />
                  <span>ENG</span>
                </div>
              </div>
            </div>
          </div>

          {/* IMAGE */}
          <div className=''>
            <img
              src={product?.image}
              alt={product?.title}
              className='w-full rounded-xl border border-gray-400'
            />
          </div>
        </div>
      </div>
    </>
  );
};
