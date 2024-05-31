import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';
import App from './App.jsx';
import ErrorPage from "./error-page";
import './i18n.js';
import './index.css';
import MainLayout from './layout/index.jsx';
import Contact from './page/contact.jsx';
import Login from './page/login';
import News from './page/news.jsx';
import Products from './page/products.jsx';

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
    path: "/products",
    element: <MainLayout>
      <Products />
    </MainLayout>,
  },
  {
    path: "/contact",
    element: <MainLayout>
      <Contact />
    </MainLayout>,
  },
  {
    path: "/news",
    element: <MainLayout>
      <News />
    </MainLayout>,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
