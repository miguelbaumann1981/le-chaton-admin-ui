import { MdFaceRetouchingNatural } from 'react-icons/md';
import { MdDashboard } from 'react-icons/md';
import { Link } from 'react-router';
import { useI18n } from '../../i18n';

export const Header = () => {
  const { setLang } = useI18n();

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
            <li>
              <a>Item A</a>
            </li>

            <li>
              <a>Item B</a>
            </li>
          </ul>
        </div>
        <a className='btn btn-ghost text-xl'>
          <Link to='/'>
            <img
              src='/images/le-chaton-icon-bn.png'
              className='h-9'
              alt='Logo Le Chaton'
            />
          </Link>
        </a>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1'>
          <li className='text-xl px-4'>
            <Link to='/products'>
              <a className='flex items-center gap-2'>
                <MdDashboard />
                <span>Productos</span>
              </a>
            </Link>
          </li>

          <li className='text-xl px-4'>
            <Link to='/users'>
              <a className='flex items-center gap-2'>
                <MdFaceRetouchingNatural /> Usuarios
              </a>
            </Link>
          </li>
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
