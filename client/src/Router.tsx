import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import { Layout } from "./pages/Layout";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import CheckoutCancel from "./pages/CheckoutCancel";

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
                index: true,
            },
            {
                path: "/cancel",
                element: <CheckoutCancel />,
                index: true,
            },
        ],
    },
]);
