import { MdFace, MdStorefront } from 'react-icons/md';
import { MdEmail } from 'react-icons/md';
import { MdLibraryBooks } from 'react-icons/md';
import { Link, useLocation } from 'react-router';
import { useI18n } from '../../i18n';

interface MenuItem {
  name: string;
  url: string;
  icon: React.ReactNode;
}

export const Header = () => {
  const { t, setLang } = useI18n();

  const menu: MenuItem[] = [
    {
      name: t('menu.products'),
      url: '/products',
      icon: <MdStorefront />,
    },
    {
      name: t('menu.users'),
      url: '/users',
      icon: <MdFace />,
    },
    {
      name: t('menu.orders'),
      url: '/orders',
      icon: <MdLibraryBooks />,
    },
    {
      name: t('menu.notifications'),
      url: '/notifications',
      icon: <MdEmail />,
    },
  ];
  const { pathname } = useLocation();
  const isActiveRoute = (to: string) => {
    if (pathname.includes('/products/') && to === '/products') {
      return true;
    }
    return pathname === to;
  };

  return (
    <header className='navbar bg-primary-content shadow-sm'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              {' '}
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />{' '}
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className='menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow'
          >
            {menu.map((item: MenuItem) => (
              <li key={item.name} className='flex items-center gap-2'>
                <Link to={item.url}>
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Link to='/' className='btn btn-ghost text-xl'>
          <img
            src='/images/le-chaton-icon-bn.png'
            className='h-9'
            alt='Logo Le Chaton'
          />
        </Link>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1'>
          {menu.map((item: MenuItem) => (
            <li
              key={item.name}
              className='text-xl px-4 flex items-center gap-2'
            >
              <Link
                to={item.url}
                className={`${isActiveRoute(item.url) ? 'bg-neutral text-white' : ''}`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className='navbar-end'>
        <a className='btn' onClick={() => setLang('es')}>
          <img
            src='/images/spain-flag.png'
            alt='Spain flag icon'
            className='h-5'
          />
        </a>
        <a className='btn' onClick={() => setLang('en')}>
          <img src='/images/uk-flag.png' alt='UK flag icon' className='h-5' />
        </a>
      </div>
    </header>
  );
};
