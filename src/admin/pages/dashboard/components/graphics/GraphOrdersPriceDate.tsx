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
import { useOrdersPriceDate } from '../../hooks/useOrdersPriceDate';
import type { OrdersPriceDate } from '../../interfaces/orders-price-date.inteface';
import { useI18n } from '../../../../../i18n';
import { NumericFormat } from 'react-number-format';

interface PriceMonth {
  month: string;
  totalPrice: number;
  index?: string;
}

const GraphOrdersPriceDate = () => {
  const { t } = useI18n();
  const { data } = useOrdersPriceDate();

  const mapDataByDate = data?.map((item: OrdersPriceDate) => {
    const monthRaw = new Date(item.orderDate).toLocaleString('default', {
      month: 'long',
    });
    const monthCapitalized =
      monthRaw.charAt(0).toUpperCase() + monthRaw.slice(1);
    const index = item.orderDate.slice(5, 7); // Find the index of the first space

    return {
      ...item,
      month: monthCapitalized,
      index,
    };
  });

  const result: PriceMonth[] = mapDataByDate
    ? mapDataByDate
        .reduce((acc, order) => {
          const existing = acc.find((item) => item.month === order.month);
          const orderPrice = Number(order.totalPrice);
          if (existing) {
            existing.totalPrice = Number(
              (existing.totalPrice + orderPrice).toFixed(2),
            );
          } else {
            acc.push({
              month: order.month,
              totalPrice: Number(orderPrice.toFixed(2)),
              index: order.index,
            });
          }
          return acc;
        }, [] as PriceMonth[])
        .sort((a, b) => Number(a.index) - Number(b.index))
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
            <NumericFormat
              value={firstPayload.value?.toString()}
              thousandSeparator='.'
              decimalSeparator=','
              suffix={' €'}
              decimalScale={2}
              fixedDecimalScale={true}
              displayType='text'
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <BarChart
      style={{
        width: '100%',
        maxWidth: '100%',
        height: '100%',
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
      <XAxis dataKey='month' angle={-45} textAnchor='end' fontSize={13} />
      <YAxis width='auto' />
      <Tooltip content={CustomTooltip} />
      <Legend />
      <Bar
        dataKey='totalPrice'
        fill='#A9DBEB'
        activeBar={{ fill: 'pink', stroke: 'purple' }}
        radius={[10, 10, 0, 0]}
        name={t('graphics.benefit')}
      />

      <RechartsDevtools />
    </BarChart>
  );
};

export default GraphOrdersPriceDate;
