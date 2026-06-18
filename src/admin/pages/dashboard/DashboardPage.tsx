import { useI18n } from '../../../i18n';
import { OrdersSection } from './components/OrdersSection';
import GraphOrdersPriceDate from './components/graphics/GraphOrdersPriceDate';
import GraphOrdersProductsQuantity from './components/graphics/GraphOrdersProductsQuantity';
import { NotificationsSection } from './components/NotificationsSection';
import GraphOrdersByAction from './components/graphics/GraphOrdersByAction';

export const DashboardPage = () => {
  const { t } = useI18n();

  return (
    <>
      <div className='flex flex-col gap-5'>
        <h1 className='text-3xl font-bold mb-4'>
          <span className='text-primary'>Baumann</span>, {t('dashboard.title')}
        </h1>

        <div className='grid grid-cols-2 gap-10'>
          <OrdersSection />

          <NotificationsSection />
        </div>

        <div className='mt-5 p-2'>
          <div className='grid grid-cols-2 gap-10'>
            <GraphOrdersProductsQuantity />
            <GraphOrdersPriceDate />
            <GraphOrdersByAction />
          </div>
        </div>
      </div>
    </>
  );
};
