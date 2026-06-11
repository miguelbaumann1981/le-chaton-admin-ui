import {
  Pie,
  PieChart,
  type PieLabelRenderProps,
  type PieSectorShapeProps,
  Sector,
} from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';
import { useOrdersByAction } from '../../hooks/useOrdersByAction';
import type { OrdersByAction } from '../../interfaces/orders-by-action.interface';
import { useNotificationActionText } from '../../hooks/useNotificationActionText';
import { useI18n } from '../../../../../i18n';

// #endregion
const RADIAN = Math.PI / 180;
const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: PieLabelRenderProps) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const ncx = Number(cx);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const ncy = Number(cy);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill='white'
      textAnchor={x > ncx ? 'start' : 'end'}
      dominantBaseline='central'
    >
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

const MyCustomPie = (props: PieSectorShapeProps) => {
  return <Sector {...props} fill={COLORS[props.index % COLORS.length]} />;
};

// #endregion
const OrderActionLegendItem = ({
  order,
  index,
}: {
  order: OrdersByAction;
  index: number;
}) => {
  const actionText = useNotificationActionText(order.action);
  return (
    <span key={index} className='inline-flex items-center gap-1'>
      <span
        className='inline-block w-4 h-4 mr-1'
        style={{ backgroundColor: COLORS[index % COLORS.length] }}
      />
      {actionText}
    </span>
  );
};

const GraphOrdersByAction = ({
  isAnimationActive = true,
}: {
  isAnimationActive?: boolean;
}) => {
  const { t } = useI18n();
  const { data = [] } = useOrdersByAction();
  const ordersByAction: OrdersByAction[] = data;

  return (
    <div className='flex flex-col gap-3 border border-gray-400 p-4 bg-base-300 rounded-lg'>
      <h2 className='text-xl font-semibold'>
        {t('graphics.distributionOrders')}
      </h2>

      <PieChart
        style={{
          width: '100%',
          maxWidth: '500px',
          maxHeight: '80vh',
          aspectRatio: 1,
        }}
        responsive
      >
        <Pie
          data={ordersByAction}
          labelLine={false}
          label={renderCustomizedLabel}
          fill='#8884d8'
          dataKey='count'
          isAnimationActive={isAnimationActive}
          shape={MyCustomPie}
        />
        <RechartsDevtools />
      </PieChart>

      <div className='flex items-center gap-6'>
        {ordersByAction.map((order, index) => (
          <OrderActionLegendItem key={index} order={order} index={index} />
        ))}
      </div>
    </div>
  );
};

export default GraphOrdersByAction;
