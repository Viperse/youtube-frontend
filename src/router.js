import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Watch from "./pages/Watch";
import Layout from "./components/Layout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
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