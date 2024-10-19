import './App.css';
import Home from './pages/Home';
import TanStackProvider from './providers/TanStackProvider';

function App() {
  return (
    <>
      <TanStackProvider>
        <>
          <h1 className='bg-slate-600 text-3xl font-bold underline'>Hello world!</h1>
          <Home />
        </>
      </TanStackProvider>
    </>
  );
}

export default App;
