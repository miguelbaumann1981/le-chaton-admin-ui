import { NumericFormat } from 'react-number-format';
import { useI18n } from '../../../../i18n';
import type { OrderDetail } from '../../orders/interfaces/order.interface';

export const OrderDetailsCard = ({
  productId,
  title,
  price,
  quantity,
}: OrderDetail) => {
  const { t } = useI18n();

  return (
    <div className='card bg-base-200 border border-gray-600 px-3 py-2'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-3'>
          <span className='badge badge-secondary badge-outline'>
            {quantity} ud
          </span>
          <span className='font-semibold'>{title}</span>
        </div>
        <span className='badge badge-soft badge-accent'>
          <NumericFormat
            value={price}
            thousandSeparator='.'
            decimalSeparator=','
            suffix={' €'}
            decimalScale={2}
            fixedDecimalScale={true}
            displayType='text'
          />
        </span>
      </div>
      <p className='text-sm py-2'>
        {t('products.id')}: <span className='text-white ml-2'>{productId}</span>
      </p>
    </div>
  );
};
