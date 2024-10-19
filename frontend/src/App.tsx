import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Question from './pages/Question';
import NotFound from './pages/NotFound';
import TanStackProvider from './providers/TanStackProvider';

function App() {
  return (
    <TanStackProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/question/:questionid' element={<Question />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </TanStackProvider>
  );
}

export default App;
