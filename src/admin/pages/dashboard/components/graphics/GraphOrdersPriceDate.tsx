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
import { useOrdersPriceDate } from '../../../../hooks/useOrdersPriceDate';
import type { OrdersPriceDate } from '../../../../interfaces/orders-price-date.inteface';

interface PriceMonth {
  month: string;
  totalPrice: number;
  index?: string;
}

const GraphOrdersPriceDate = () => {
  const { data } = useOrdersPriceDate();

  console.log('data', data);

  const mapByDate = data?.map((item: OrdersPriceDate) => {
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

  console.log('mapByDate', mapByDate);

  const result: PriceMonth[] = mapByDate
    ? mapByDate
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

  console.log(
    'result',
    result.sort((a, b) => Number(a.index) - Number(b.index)),
  );

  return (
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
      <XAxis dataKey='month' angle={-45} textAnchor='end' fontSize={13} />
      <YAxis width='auto' />
      <Tooltip />
      <Legend />
      <Bar
        dataKey='totalPrice'
        fill='#2284d8'
        activeBar={{ fill: 'pink', stroke: 'blue' }}
        radius={[10, 10, 0, 0]}
      />

      <RechartsDevtools />
    </BarChart>
  );
};

export default GraphOrdersPriceDate;
