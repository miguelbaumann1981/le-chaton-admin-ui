import { RouterProvider } from 'react-router';
import { appRouter } from './app.router';

export const LeChatonAdminApp = () => {
  return (
    <>
      <RouterProvider router={appRouter}></RouterProvider>
    </>
  );
};
