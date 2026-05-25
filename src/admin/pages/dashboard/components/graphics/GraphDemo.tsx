import {
  Pie,
  PieChart,
  type PieLabelRenderProps,
  type PieSectorShapeProps,
  Sector,
} from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';

// #region Sample data
const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

// #endregion
const RADIAN = Math.PI / 180;
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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
const GraphDemo = ({
  isAnimationActive = true,
}: {
  isAnimationActive?: boolean;
}) => {
  return (
    <div className='flex flex-col gap-3 border border-gray-400 p-4 bg-base-300 rounded-lg'>
      <h2 className='text-xl font-semibold'>Graph demo</h2>
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
          data={data}
          labelLine={false}
          label={renderCustomizedLabel}
          fill='#8884d8'
          dataKey='value'
          isAnimationActive={isAnimationActive}
          shape={MyCustomPie}
        />
        <RechartsDevtools />
      </PieChart>

      <div className='text-sm text-gray-500'>
        <p>Leyenda</p>
        <div className='flex items-center gap-2'>
          <span className='inline-block w-3 h-3 bg-blue-500 mr-1' /> Group A
          <span className='inline-block w-3 h-3 bg-yellow-500 mr-1' /> Group C
          <span className='inline-block w-3 h-3 bg-orange-500 mr-1' /> Group D
        </div>
      </div>
    </div>
  );
};

export default GraphDemo;
