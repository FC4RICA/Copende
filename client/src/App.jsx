import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import ProfilePage from './pages/ProfilePage';
import PlayPage from './pages/PlayPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import Footer from './components/layout/Footer';

const Layout = () => {
  return(
    <>
      <Navbar />
      <Outlet />
      <Footer />
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
        element: <HomePage />,
      },
      {
        path: '/signin',
        element: <SignInPage />,
      },
      {
        path: '/signup',
        element: <SignUpPage />,
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

const App = () => {
  return(
    <RouterProvider router={router} />
  )
}

export default App;