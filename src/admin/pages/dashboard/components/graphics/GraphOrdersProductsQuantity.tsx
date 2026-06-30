import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  type TooltipContentProps,
  Legend,
} from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';
import { useAllOrdersProducts } from '../../hooks/useAllOrdersProducts';
import { useI18n } from '../../../../../i18n';

interface QuantityProducts {
  productId: string;
  quantity: number;
  title: string;
}

const GraphOrdersProductsQuantity = () => {
  const { t } = useI18n();
  const { data } = useAllOrdersProducts();

  const result = data?.productsOrders
    ? data.productsOrders.reduce((acc, order) => {
        const existing = acc.find((item) => item.productId === order.productId);
        if (existing) {
          existing.quantity += order.quantity;
        } else {
          acc.push({
            productId: order.productId,
            title: order.title,
            quantity: order.quantity,
          });
        }
        return acc;
      }, [] as QuantityProducts[])
    : [];

  const CustomTooltip = ({ active, payload, label }: TooltipContentProps) => {
    const firstPayload = payload?.[0];
    const isVisible = active && firstPayload != null;
    return (
      <div
        className='text-white text-xl bg-base-100 py-2 px-4 border border-gray-100 rounded-md'
        style={{ visibility: isVisible ? 'visible' : 'hidden' }}
      >
        {isVisible && (
          <div className='flex gap-2'>
            <p className='text-base-content'>{label}:</p>
            <p>{firstPayload.value} ud.</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className='flex flex-col gap-3 border border-gray-600 py-4 px-8 bg-base-300 rounded-lg'>
      <h2 className='text-xl font-semibold'>
        {t('graphics.quantityProducts')}
      </h2>
      <BarChart
        style={{
          width: '100%',
          maxWidth: '100%',
          maxHeight: 500,
          aspectRatio: 1.618,
        }}
        responsive
        data={result}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='title' angle={-45} textAnchor='end' fontSize={13} />
        <YAxis width='auto' />
        <Tooltip content={CustomTooltip} />
        <Legend />
        <Bar
          dataKey='quantity'
          fill='#43c6ac'
          activeBar={{ fill: 'pink', stroke: 'purple' }}
          radius={[10, 10, 0, 0]}
          name={t('graphics.quantity')}
        />

        <RechartsDevtools />
      </BarChart>
    </div>
  );
};

export default GraphOrdersProductsQuantity;
