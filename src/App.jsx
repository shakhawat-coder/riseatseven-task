import { Route, createBrowserRouter, RouterProvider, createRoutesFromElements } from 'react-router-dom'
import Home from './pages/Home';
import Rootlayout from './components/layout/Rootlayout';
import { CursorProvider } from './components/common/Cursor';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Rootlayout />}>
        <Route index element={<Home />} />
      </Route>
    )
  );
  
  return (
    <CursorProvider>
      <RouterProvider router={router} />
    </CursorProvider>
  )
}

export default App
