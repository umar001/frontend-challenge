import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
// import MainRoutes from './router';
import { router } from "./router"


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
