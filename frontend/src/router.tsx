import { createBrowserRouter } from 'react-router-dom';
import Home from './routes/Home';
import Question from './routes/Question';
import ErrorPage from './error-page';
import NotFound from './routes/NotFound';
import QuestionCreate from './components/QuestionCreate';

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
  {
    path: '/question/create',
    element: <QuestionCreate />,
    errorElement: <ErrorPage />,
  },
  // 404 page
  {
    path: '/*',
    element: <NotFound />,
  },
]);

export default router;
