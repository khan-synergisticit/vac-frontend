import React, { lazy, Suspense } from 'react';
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, useRoutes, Outlet, Navigate,} from "react-router-dom";
import DashboardComponent from '../dashboard/dashboard.jsx';
//export const Page404 = lazy(() => import('../pages/pageNotFound.jsx'));
import NotFoundPage from '../pages/pageNotFound.jsx';
import UserFormComponent from '../pages/userForm.jsx';
import UsersHomePage from '../home/users/usersHome.jsx';
import AdminHomePage from '../home/admin/adminHome.jsx';
import AllPatientsPage from '../pages/allPatients.jsx';
// ----------------------------------------------------------------------

export default function UserRouter() {
  let Role = useSelector((state) => state.UserRoleReducer.Role);
  let isAdmin = Role == "admin";

  let AdminRoute = ()=>{
    
    return <Routes>
    <Route path="/*" element={<NotFoundPage/>}/>
    <Route path="/" element={<Navigate replace to="/home" />} />
    <Route path='/home' element={<AdminHomePage />}/>      
    <Route path="/patients" element={<AllPatientsPage />}/>
  </Routes>
  
  }

  let UserRoute = () =>{
    
     return  <Routes>
     <Route path="/*" element={<NotFoundPage/>}/>
     <Route path="/" element={<Navigate replace to="/home" />} />
     <Route path="/userForm" element={<UserFormComponent/>}/>
     <Route path='/home' element={<UsersHomePage />}/>    
   </Routes>
    
  }
  
  return(
    <>
    {isAdmin ? <AdminRoute/> : <UserRoute/>}
    </>
  )
  // return (
  //   // <Routes>
  //   //   <Route path="/*" element={<NotFoundPage/>}/>
  //   //   <Route path="/" element={<Navigate replace to="/home" />} />
  //   //   {isAdmin ? null : <Route path="/userForm" element={<UserFormComponent/>}/>}
  //   //   {isAdmin ? <Route path='/home' element={<AdminHomePage />}/> :<Route path='/home' element={<UsersHomePage />}/>}
      
  //   // </Routes>
  //   {isAdmin ? adminRoute() : userRoute()}
  // )
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
