import { useI18n } from '../../../i18n';
import { OrdersSection } from './components/OrdersSection';
import { NotificationsSection } from './components/NotificationsSection';
import { GraphCard } from './components/GraphCard';

export const DashboardPage = () => {
  const { t } = useI18n();

  return (
    <>
      <div className='flex flex-col gap-5'>
        <h1 className='text-3xl font-bold mb-4'>
          <span className='text-primary'>Baumann</span>, {t('dashboard.title')}
        </h1>

        <div className='grid grid-cols-2  gap-10'>
          <OrdersSection />

          <NotificationsSection />
        </div>

        <div className='mt-5'>
          <div className='grid grid-cols-4  gap-10'>
            <GraphCard
              id='productsInOrders'
              title={t('graphics.quantityProducts')}
            />
            <GraphCard id='ordersByMonth' title={t('graphics.ordersMonth')} />
            <GraphCard id='salesByMonth' title={t('graphics.salesDate')} />
            <GraphCard
              id='ordersByAction'
              title={t('graphics.distributionOrders')}
            />
          </div>
        </div>
      </div>
    </>
  );
};
