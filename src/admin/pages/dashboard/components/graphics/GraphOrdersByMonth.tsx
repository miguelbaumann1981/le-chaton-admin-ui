import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  type TooltipContentProps,
} from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';
import { useOrders } from '../../../orders/hooks/useOrders';
import type { Order } from '../../../orders/interfaces/order.interface';
import { parseMonthByName } from '../../../../helpers/parse-month-by-name';
import { useI18n } from '../../../../../i18n';

interface monthOrdersById {
  month: string | Date;
  quantity: number;
}

const GraphOrdersByMonth = () => {
  const { t } = useI18n();
  const { data } = useOrders(1000, null);
  const allOrders: Order[] = data?.orders || [];

  const defaultMonthOrders: monthOrdersById[] = [
    { month: '01', quantity: 0 },
    { month: '02', quantity: 0 },
    { month: '03', quantity: 0 },
    { month: '04', quantity: 0 },
    { month: '05', quantity: 0 },
    { month: '06', quantity: 0 },
    { month: '07', quantity: 0 },
    { month: '08', quantity: 0 },
    { month: '09', quantity: 0 },
    { month: '10', quantity: 0 },
    { month: '11', quantity: 0 },
    { month: '12', quantity: 0 },
  ];

  const groupOrders = (orders: Order[]): monthOrdersById[] => {
    const ordersByMonth = orders.reduce<Record<string, number>>(
      (acc, order) => {
        const month = order.orderDate.toString().slice(5, 7);
        acc[month] = (acc[month] ?? 0) + 1;
        return acc;
      },
      {},
    );

    return Object.entries(ordersByMonth).map(([month, quantity]) => ({
      month,
      quantity,
    }));
  };

  const mappedOrders = groupOrders(allOrders);

  const finalOrders: monthOrdersById[] = defaultMonthOrders.map(
    (defaultMonth) => ({
      month: t(parseMonthByName(defaultMonth.month.toString())),
      quantity:
        mappedOrders.find((order) => order.month === defaultMonth.month)
          ?.quantity ?? defaultMonth.quantity,
    }),
  );

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
            <p>{firstPayload.value}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <LineChart
      style={{
        width: '100%',
        height: '100%',
        maxHeight: '90%',
        aspectRatio: 1.618,
      }}
      responsive
      data={finalOrders}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray='3 3' stroke='grey' />
      <XAxis dataKey='month' stroke='grey' />
      <YAxis width='auto' stroke='grey' />
      <Tooltip
        cursor={{
          stroke: 'grey',
        }}
        contentStyle={{
          backgroundColor: '#2a2a2a',
          borderColor: 'grey',
        }}
        content={CustomTooltip}
      />
      <Legend />
      <Line
        type='monotone'
        dataKey='quantity'
        stroke='pink'
        dot={{
          fill: 'yellow',
        }}
        activeDot={{ r: 8, fill: 'red', stroke: 'yellow' }}
        name={t('graphics.quantity')}
      />

      <RechartsDevtools />
    </LineChart>
  );
};

export default GraphOrdersByMonth;
