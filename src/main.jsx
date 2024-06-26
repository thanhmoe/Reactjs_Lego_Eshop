import React, {useEffect, Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import store from './redux/store.js';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';
import App from './App.jsx';
import ErrorPage from "./error-page";
import './i18n.js';
import './index.css';
import MainLayout from './layout/index.jsx';
import Products from './page/product/products.jsx';
import Contact from './page/contact/contact.jsx';
import News from './page/news/news.jsx';
import About from './page/about/about.jsx';
import Login from './page/login.jsx';
import Signup from './page/register/signup.jsx';
import ProductsDetail from './page/product/productsDetail.jsx';
import NewsDetail from './page/news/newsDetail.jsx';
import LoadingModal from './modal/loadingModal.jsx';
import CartComponent from './page/cart/cart.jsx';


export const cookies = new Cookies(null, { path: '/' })

//custom notification
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

//routers
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
    path: "/news/:articleId",
    element: <MainLayout>
      <NewsDetail />
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
    path: "/cart",
    element: <MainLayout>
      <CartComponent />
    </MainLayout>,
  },
  {
    path: "/login",
    element: <Suspense fallback={<LoadingModal />}>
      <Login />
    </Suspense>,
  },
  {
    path: "/signup",
    element: <Suspense fallback={<LoadingModal />}>
      <Signup />
    </Suspense>,
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
