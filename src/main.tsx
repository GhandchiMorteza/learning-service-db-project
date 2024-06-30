import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './components/pages/LandingPage.tsx';
import LoginPage from './components/pages/LoginPage.tsx';
import SignupPage from './components/pages/SignupPage.tsx';

import './index.css';
import AddInfoPage from './components/pages/AddInfoPage.tsx';
import MyCourse from './components/pages/MyCourse.tsx';
import Service from './components/comp/Service.tsx';
import Course from './components/pages/Course.tsx';
import Article, { loader as videoLoader } from './components/pages/Article.tsx';
import Video, { loader as courseLoader } from './components/pages/Video.tsx';
import Exam from './components/pages/Exam.tsx';
// import { loader as infoloader } from './components/forms/AddInfoForm.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    children: [
      {
        path: '/',
        element: <Service />,
      },
      {
        path: '/mycourse',
        element: <MyCourse />,
      },
      {
        path: '/course',
        element: <Course />,
        children: [
          {
            path: '/course/1/:serviceId',
            element: <Video />,
            loader: courseLoader,
          },
          {
            path: '/course/2/:serviceId',
            element: <Article />,
            loader: videoLoader,
          },
          {
            path: '/course/3/',
            element: <Exam />,
          },
        ],
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/signup',
        element: <SignupPage />,
      },
      {
        path: '/addinfo',
        element: <AddInfoPage />,
        // loader: infoloader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
