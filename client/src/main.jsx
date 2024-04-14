import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import Navbar from './navigation/Navbar';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import ProfilePage from './pages/ProfilePage';
import PlayPage from './pages/PlayPage';

import './index.css';
// Supports weights 200-900
import '@fontsource-variable/source-code-pro';

const Layout = () => {
  return(
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage/>,
      },
      {
        path: '/play',
        element: <PlayPage />,
      },
      {
        path: '/profile/:profileId',
        element: <ProfilePage />,
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
