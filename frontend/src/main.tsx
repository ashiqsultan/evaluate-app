import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import TanStackProvider from './providers/TanStackProvider';
import './index.css';
import router from './router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TanStackProvider>
      <RouterProvider router={router} />
    </TanStackProvider>
  </StrictMode>,
);
