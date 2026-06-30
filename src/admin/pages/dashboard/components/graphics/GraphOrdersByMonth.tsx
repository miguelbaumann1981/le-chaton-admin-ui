import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';

// #region Sample data
const data = [
  {
    name: 'Ene',
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Feb',
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Mar',
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Abr',
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'May',
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Jun',
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Jul',
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Ago',
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Sep',
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Oct',
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Nov',
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Dic',
    pv: 4300,
    amt: 2100,
  },
];
// #endregion

const GraphOrdersByMonth = () => {
  return (
    <LineChart
      style={{
        width: '100%',
        height: '100%',
        maxHeight: '90%',
        aspectRatio: 1.618,
      }}
      responsive
      data={data}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray='3 3' stroke='grey' />
      <XAxis dataKey='name' stroke='grey' />
      <YAxis width='auto' stroke='grey' />
      <Tooltip
        cursor={{
          stroke: 'grey',
        }}
        contentStyle={{
          backgroundColor: '#2a2a2a',
          borderColor: 'grey',
        }}
      />
      <Legend />
      <Line
        type='monotone'
        dataKey='pv'
        stroke='pink'
        dot={{
          fill: 'purple',
        }}
        activeDot={{ r: 8, stroke: 'purple' }}
      />

      <RechartsDevtools />
    </LineChart>
  );
};

export default GraphOrdersByMonth;
