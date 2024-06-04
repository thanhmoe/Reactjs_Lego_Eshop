import React, { Suspense, lazy } from 'react';
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
import Products from './page/product/products.jsx';
import Contact from './page/contact.jsx';
import News from './page/news.jsx';
import About from './page/about.jsx';
import Login from './page/login.jsx';
import ProductsDetail from './page/product/productsDetail.jsx';


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
    path: "/products/:productId",
    element: <MainLayout>
      <ProductsDetail />
    </MainLayout>,
  },


  {
    path: "/detail",
    element: <MainLayout>
      <ProductsDetail />
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
    path: "/about",
    element: <MainLayout>
      <About />
    </MainLayout>,
  },
  {
    path: "/login",
    element: <Suspense fallback={<h2>loading</h2>}>
      <Login />
    </Suspense>,
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
