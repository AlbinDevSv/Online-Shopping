import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import { Layout } from "./pages/Layout";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import CheckoutCancel from "./pages/CheckoutCancel";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/login/RegisterPage";
import LoginSuccess from "./pages/login/LoginSuccess";
import LoginFailed from "./pages/login/LoginFailed";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            {
                path: "/",
                element: <HomePage />,
                index: true,
            },
            {
                path: "/success",
                element: <CheckoutSuccess />,
            },
            {
                path: "/cancel",
                element: <CheckoutCancel />,
            },
            {
                path: "/login",
                element: <LoginPage />,
            },
            {
                path: "/register",
                element: <RegisterPage />,
            },
            {
                path: "/register/failed",
                element: <LoginFailed />,
            },
            {
                path: "/register/success",
                element: <LoginSuccess />,
            },
        ],
    },
]);
