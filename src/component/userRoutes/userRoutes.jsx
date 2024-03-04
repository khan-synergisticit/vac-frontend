import React, { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

export const Page404 = lazy(() => import('../pages/pageNotFound.jsx'));

// ----------------------------------------------------------------------

export default function UserRouter() {
  const routes = useRoutes([
    {
      element: (
        {/* <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout> */}
      ),
      children: [
       // { element: <IndexPage />, index: true },
        //{ path: 'admin', element: <AdminPage /> },
       
      ],
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}