import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import App from './App.jsx';
import ErrorPage from "./error-page";
import './index.css';
import Login from './page/login';
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainLayout from './layout/index.jsx';

export const cookies = new Cookies(null, { path: '/' })

//custom notify
export const notify = (type, content, position) => {
  const config = {
    position: position,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  }
  switch (type) {
    case 'success':
      toast.success(content, config);
      break;
    case 'warn':
      toast.warn(content, config);
      break;
    case 'error':
      toast.error(content, config);
      break;
    case 'info':
      toast.info(content, config);
      break;

    default:
      break;
  }


}

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout>
      <App />
    </MainLayout>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <ToastContainer /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
