import { Outlet } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const AdminLayout = () => {
  return (
    <div className=''>
      <Header />
      <main className='border border-amber-200'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
