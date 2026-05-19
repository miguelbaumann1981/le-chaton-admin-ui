import { createBrowserRouter, Navigate } from 'react-router';
import { DashboardPage } from './admin/pages/dashboard/DashboardPage';
import { LoginPage } from './auth/pages/login/LoginPage';
import { lazy } from 'react';
import { ProductsPage } from './admin/pages/products/ProductsPage';
import { UsersPage } from './admin/pages/users/UsersPage';
import { OrdersPage } from './admin/pages/orders/OrdersPage';
import { NotificationsPage } from './admin/pages/notifications/NotificationsPage';

const AuthLayout = lazy(() => import('./auth/layout/AuthLayout'));
const AdminLayout = lazy(() => import('./admin/layout/AdminLayout'));

export const appRouter = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to='/auth/login' />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
  {
    path: '/',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'products',
        element: <ProductsPage />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
      {
        path: 'orders',
        element: <OrdersPage />,
      },
      {
        path: 'notifications',
        element: <NotificationsPage />,
      },
    ],
  },

  {
    path: '*',
    element: <Navigate to='/' />,
  },
]);
