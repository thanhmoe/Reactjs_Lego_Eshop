import React,{ Suspense, lazy } from 'react';
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


export const cookies = new Cookies(null, { path: '/' })

// Lazy loading pages
const Contact = lazy(() => import('./page/contact.jsx'));
const Login = lazy(() => import('./page/login'));
const News = lazy(() => import('./page/news.jsx'));
const Products = lazy(() => import('./page/products.jsx'));



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
      <Suspense fallback = {<div>loading</div>}>
      <App />
      </Suspense>
    </MainLayout>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/products",
    element: <MainLayout>
      <Suspense fallback = {<div>loading</div>}>
      <Products />
      </Suspense>
    </MainLayout>,
  },
  {
    path: "/contact",
    element: <MainLayout>
      <Suspense fallback = {<div>loading</div>}>
      <Contact />
      </Suspense>
    </MainLayout>,
  },
  {
    path: "/news",
    element: <MainLayout>
      <Suspense fallback = {<div>loading</div>}>
      <News />
      </Suspense>
    </MainLayout>,
  },
  {
    path: "/login",
    element:
     <Login />,
  },
]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
