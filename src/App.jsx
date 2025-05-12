import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Category from "./components/Category/Category";
import Brand from "./components/Brand/Brand";
import Cart from "./components/Cart/Cart";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Error from "./components/Error/Error";
import Allorders from "./components/Allorders/Allorders";
import Wishlist from "./components/Wishlist/Wishlist";
import UserContext from './Context/UserContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CartContext from './Context/CartContext';
import WishContextProvider from './Context/WishlistContext'
import Payment from './components/Payment/Payment';
import ForgotPass from './components/ForgotPass/ForgotPass';
import VerifyResetCode from './components/VerifyResetCode/VerifyResetCode';
import ResetPassword from './components/ResetPassword/ResetPassword';
import Dashboard from './Dashboard/Dashboard';
import AdminLogin from './Dashboard/AdminLogin.jsx';


let paths = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute>},
      { path: "products", element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: "ForgotPass", element: <ForgotPass /> },
      { path: "VerifyCode", element: <VerifyResetCode /> },
      { path: "ResetPass", element: <ResetPassword /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "admin-login", element: <AdminLogin /> },
      { path: "category", element: <ProtectedRoute><Category /></ProtectedRoute> },
      { path: "brand", element: <ProtectedRoute><Brand /></ProtectedRoute> },
      { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: "wishlist", element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
      { path: "Allorders", element: <ProtectedRoute><Allorders /></ProtectedRoute> },
      { path: "payment", element: <ProtectedRoute><Payment /></ProtectedRoute> },
      { path: "ProductDetails/:id/:category", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "*", element: <Error /> },
    ],
  },
]);

function App() {

  return   <>
<UserContext>
<CartContext>
<WishContextProvider>
<ToastContainer />
<RouterProvider router={paths}></RouterProvider>
</WishContextProvider>
</CartContext>
</UserContext>
 </>
}

export default App
