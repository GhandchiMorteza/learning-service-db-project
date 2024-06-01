import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import LandingPage from './components/pages/LandingPage.tsx';
import LoginPage from './components/pages/LoginPage.tsx';
import SignupPage from './components/pages/SignupPage.tsx';
import EditProfilePage from './components/pages/EditProfilePage.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/signup",
    element: <SignupPage/>
  },
  {
    path: "/editprofile",
    element: <EditProfilePage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
