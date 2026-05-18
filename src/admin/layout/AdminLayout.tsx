import { Outlet } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const AdminLayout = () => {
  return (
    <>
      <Header />
      <main className='p-5 border border-amber-200'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default AdminLayout;
