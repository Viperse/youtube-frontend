import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Watch from "./pages/Watch";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            {
                index : true,
                element: <Home />,
            },
            {
                path : "watch",
                element : <Watch />,
            }
        ]
    }
]);

export default router;