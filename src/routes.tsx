import { createBrowserRouter} from 'react-router';
import Home from './pages/home';
import Domain from './pages/domain';
import Hosting from './pages/hosting';
import PricingPage from './pages/pricing';
import Contacts from './pages/contacts';

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
    {
      path: '/domain',
      element: <Domain />,
    },
    {
      path: '/hosting',
      element: <Hosting />,
    },
    {
      path: '/pricing',
      element: <PricingPage />,
    },
    {
      path: '/contacts',
      element: <Contacts />,
    },
  ]);


export default router;
