import { useI18n } from '../../../i18n';
import GraphDemo from './components/GraphDemo';
import { OrdersSection } from './components/OrdersSection';
import SimpleBarChart from './components/SimpleBarChart';

export const DashboardPage = () => {
  const { t } = useI18n();

  return (
    <>
      <div className='flex flex-col gap-4'>
        <h1 className='text-3xl'>
          <span className='text-secondary'>Baumann</span>,{' '}
          {t('dashboard.title')}
        </h1>

        <div className='grid grid-cols-2 gap-4'>
          <OrdersSection />

          <div className='p-2 border border-green-200'>NOTIFICACIONES</div>
        </div>
        <div className='p-2 '>
          <p>Graficos</p>
          <div className='grid grid-cols-2 gap-4'>
            <SimpleBarChart />
            <GraphDemo />
          </div>
        </div>
      </div>
    </>
  );
};
