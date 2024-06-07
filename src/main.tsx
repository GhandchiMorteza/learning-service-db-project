import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LandingPage from './components/pages/LandingPage.tsx';
import LoginPage from './components/pages/LoginPage.tsx';
import SignupPage from './components/pages/SignupPage.tsx';

import './index.css'
import AddInfoPage from './components/pages/AddInfoPage.tsx';

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
    path: "/addinfo",
    element: <AddInfoPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
