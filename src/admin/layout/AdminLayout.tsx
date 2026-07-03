import { Outlet } from 'react-router';
import { Header } from '../components/Header';
// import { Footer } from '../components/Footer';

const AdminLayout = () => {
  return (
    <>
      <Header />
      <main className='py-5 px-4 md:px-8' tabIndex={0}>
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
