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
                path:"build-pc", 
                element: <PrivateRoute><BuildPC /></PrivateRoute>
            },
            {
                path: "about-us",
                Component: AboutUs,
                loader: ()=> fetch('/warehouses.json').then(res => res.json())
            } 
        ]
    },
    {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      }
    ]
  },
])