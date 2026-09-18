import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/home/Home";
import Components from "../pages/Components/Components";
import BuildPC from "../pages/BuildPC/BuildPC";
import AboutUs from "../pages/AboutUs/AboutUs";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Cart from "../pages/Cart/Cart";
import ProductDetails from "../pages/Components/ProductDetails/ProductDetails";
import AdminLogin from "../pages/Auth/AdminLogin/AdminLogin";
import AdminRegister from "../pages/Auth/AdminRegister/AdminRegister";
import AdminLayout from "../layouts/AdminLayout";
import Dashbord from "../pages/Admin/Dashbord/Dashbord";
import Manageuser from "../pages/Admin/Manageuser/Manageuser";
import AdminAuthLayout from "../layouts/AdminAuthLayout";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path:"components",
                Component: Components
            },
            {
                path: "/product/:id",
                element: <ProductDetails />
            },
            {
                path:"build-pc", 
                element: <PrivateRoute><BuildPC /></PrivateRoute>
            },
            {
                path: "about-us",
                Component: AboutUs,
                loader: ()=> fetch('/warehouses.json').then(res => res.json())
            },
            {
                path:"cart",
                element: <Cart />
            }
        ]
    },
    {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },

      {
        path: "register",
        Component: Register,
      },
    ],
  },
   {
    path: "/",
    Component: AdminAuthLayout,
    children: [
      {
        path: "admin-login",
        Component: AdminLogin,
      },

      {
        path: "admin-register",
        Component: AdminRegister,
      },
    ],
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      {
        index: true,
        Component: Dashbord,
      },

      {
        path: "users",
        Component: Manageuser,
      },
    ],
  },
])