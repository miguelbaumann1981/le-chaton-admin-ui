import {
  Pie,
  PieChart,
  type PieLabelRenderProps,
  type PieSectorShapeProps,
  Sector,
  Tooltip,
  type TooltipContentProps,
} from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';
import { useOrdersByAction } from '../../hooks/useOrdersByAction';
import type { OrdersByAction } from '../../interfaces/orders-by-action.interface';
import { useNotificationActionText } from '../../hooks/useNotificationActionText';
import { useI18n } from '../../../../../i18n';

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
      className='text-2xl'
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
      <span className='text-sm'>{actionText}</span>
    </span>
  );
};

const CustomTooltip = ({ active, payload }: TooltipContentProps) => {
  const { t } = useI18n();
  const firstPayload = payload?.[0];
  const isVisible = active && firstPayload != null;
  return (
    <div
      className='text-white text-xl bg-base-100 py-2 px-4 border border-gray-100 rounded-md'
      style={{ visibility: isVisible ? 'visible' : 'hidden' }}
    >
      {isVisible && (
        <p>
          {firstPayload.value} {t('menu.orders')}
        </p>
      )}
    </div>
  );
};

const GraphOrdersByAction = ({
  isAnimationActive = true,
}: {
  isAnimationActive?: boolean;
}) => {
  const { data = [] } = useOrdersByAction();
  const ordersByAction: OrdersByAction[] = data;

  return (
    <>
      <PieChart
        style={{
          width: '100%',
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
        <Tooltip content={CustomTooltip} />
        <RechartsDevtools />
      </PieChart>

      <div className='flex flex-row flex-wrap gap-6 '>
        {ordersByAction.map((order, index) => (
          <OrderActionLegendItem key={index} order={order} index={index} />
        ))}
      </div>
    </>
  );
};

export default GraphOrdersByAction;
