import { Outlet } from 'react-router';
import { Header } from '../components/Header';
// import { Footer } from '../components/Footer';

const AdminLayout = () => {
  return (
    <>
      <Header />
      <main className='py-5 px-8'>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default AdminLayout;
