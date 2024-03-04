import React, { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardComponent from '../dashboard/dashboard.jsx';
export const Page404 = lazy(() => import('../pages/pageNotFound.jsx'));

// ----------------------------------------------------------------------

export default function UserRouter({isAdmin}) {

  // return (
  //   <Routes>
  //     <Route path="*" element={<Page404/>}/>

  //   </Routes>
  // )
  const routes = useRoutes([
    {
      element: (
        
        <DashboardComponent>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardComponent>
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
