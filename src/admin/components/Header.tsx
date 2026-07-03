import { MdFace, MdStorefront } from 'react-icons/md';
import { MdEmail } from 'react-icons/md';
import { MdLibraryBooks } from 'react-icons/md';
import { Link, useLocation } from 'react-router';
import { useI18n } from '../../i18n';
import { useState } from 'react';

interface MenuItem {
  name: string;
  url: string;
  icon: React.ReactNode;
}

export const Header = () => {
  const { t, lang, setLang } = useI18n();

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
  const [displayMenuMobile, setDisplayMenuMobile] = useState(true);
  const isActiveRoute = (to: string) => {
    if (pathname.includes('/products/') && to === '/products') {
      return true;
    }
    return pathname === to;
  };

  const closeMenuAfterClick = () => {
    setDisplayMenuMobile(false);
    setTimeout(() => {
      setDisplayMenuMobile(true);
    }, 1000);
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
          {displayMenuMobile && (
            <ul
              tabIndex={-1}
              className='menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow flex flex-col items-start'
            >
              {menu.map((item: MenuItem) => (
                <li
                  key={item.name}
                  className='flex items-center gap-2 text-lg'
                  onClick={() => closeMenuAfterClick()}
                >
                  <Link to={item.url}>
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
              <li className='flex items-center flex-row gap-2'>
                <button
                  className={`btn ${lang === 'en' ? 'opacity-60' : ''} hover:opacity-100`}
                  disabled={lang === 'es'}
                  onClick={() => setLang('es')}
                >
                  <img
                    src='/images/spain-flag.png'
                    alt='Spain flag icon'
                    className='h-4'
                  />
                </button>
                <button
                  className={`btn ${lang === 'es' ? 'opacity-60' : ''} hover:opacity-100`}
                  disabled={lang === 'en'}
                  onClick={() => setLang('en')}
                >
                  <img
                    src='/images/uk-flag.png'
                    alt='UK flag icon'
                    className='h-4'
                  />
                </button>
              </li>
            </ul>
          )}
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

      <div className='navbar-end pr-4 md:visible invisible'>
        <button
          className={`btn ${lang === 'en' ? 'opacity-60' : ''} hover:opacity-100`}
          disabled={lang === 'es'}
          onClick={() => setLang('es')}
        >
          <img
            src='/images/spain-flag.png'
            alt='Spain flag icon'
            className='h-5'
          />
        </button>
        <button
          className={`btn ${lang === 'es' ? 'opacity-60' : ''} hover:opacity-100`}
          disabled={lang === 'en'}
          onClick={() => setLang('en')}
        >
          <img src='/images/uk-flag.png' alt='UK flag icon' className='h-5' />
        </button>
      </div>
    </header>
  );
};
