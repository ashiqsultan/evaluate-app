import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Home from './routes/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Question from './routes/Question';
import ErrorPage from './error-page';
import TanStackProvider from './providers/TanStackProvider';
import NotFound from './routes/NotFound';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/Question',
    element: <Question />,
    errorElement: <ErrorPage />,
  },
  // 404 page
  {
    path: '/*',
    element: <NotFound />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TanStackProvider>
      <RouterProvider router={router} />
    </TanStackProvider>
  </StrictMode>,
);
