import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import HomePage from '../pages/Home/HomePage';
import DialogPage from '../pages/Dialog/DialogPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'dialog',
        element: <DialogPage />
      }
    ]
  }
]);

export default router; 