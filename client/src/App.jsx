import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import Navbar from './navigation/Navbar';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import ProfilePage from './pages/ProfilePage';
import PlayPage from './pages/PlayPage';

const Layout = () => {
  return(
    <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
      <Navbar />
      <div style={{height: '100%'}}>
        <Outlet />
      </div>
    </div>
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

const App = () => {
  return(
    <RouterProvider router={router} />
  )
}

export default App;