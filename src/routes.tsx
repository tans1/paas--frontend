import { createBrowserRouter } from 'react-router';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <div>Login</div>,
  },

  {
    path: '/register',
    element: <div>Register</div>,
  },
]);

export default router;