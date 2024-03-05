import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useRoutes, Outlet, Navigate,} from "react-router-dom";
import DashboardComponent from '../dashboard/dashboard.jsx';
//export const Page404 = lazy(() => import('../pages/pageNotFound.jsx'));
import NotFoundPage from '../pages/pageNotFound.jsx';
import UserFormComponent from '../pages/userForm.jsx';
import HomePage from '../pages/pageHome.jsx';
// ----------------------------------------------------------------------

export default function UserRouter({isAdmin}) {

  return (
    <Routes>
      <Route path="/*" element={<NotFoundPage/>}/>
      <Route path="/" element={<Navigate replace to="/home" />} />
      {isAdmin ? null : <Route path="/userForm" element={<UserFormComponent/>}/>}
      <Route path='/home' element={<HomePage />}/>
    </Routes>
  )
  // const routes = useRoutes([
  //   {
  //     element: (
        
  //       <DashboardComponent>
  //         <Suspense>
  //           <Outlet />
  //         </Suspense>
  //       </DashboardComponent>
  //     ),
  //     children: [
  //      // { element: <IndexPage />, index: true },
  //       //{ path: 'admin', element: <AdminPage /> },
       
  //     ],
  //   },
  //   {
  //     path: '404',
  //     element: <Page404 />,
  //   },
  //   {
  //     path: '*',
  //     element: <Navigate to="/404" replace />,
  //   },
  // ]);

  // return routes;
}
