import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Layout from '../Layout/index.jsx';
import Dashboard from '../pages/Dashborad.jsx';
import SignUp from '../pages/SignUp.jsx';
import SignIn from '../pages/SignIn.jsx';
import RoleManagement from '../pages/RoleManagement.jsx';
import PermissionManagement from '../pages/PermissionManagement.jsx';
import HomeLayout from '../Layout/HomeLayout.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/home" element={<HomeLayout />}>
        <Route path="" element={<Dashboard />} />
        <Route path="role" element={<RoleManagement />} />
        <Route path="permission" element={<PermissionManagement />} />
      </Route>
    </Route>
  ),
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
