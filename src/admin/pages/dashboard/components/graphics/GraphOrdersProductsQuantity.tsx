import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';
import { useAllOrdersProducts } from '../../../../hooks/useAllOrdersProducts';
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
    ? data.productsOrders
        .reduce((acc, order) => {
          const existing = acc.find(
            (item) => item.productId === order.productId,
          );
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
        .slice(0, 10)
    : [];

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
        <Tooltip />
        <Legend />
        <Bar
          dataKey='quantity'
          fill='#8884d8'
          activeBar={{ fill: 'pink', stroke: 'blue' }}
          radius={[10, 10, 0, 0]}
        />

        <RechartsDevtools />
      </BarChart>
    </div>
  );
};

export default GraphOrdersProductsQuantity;
