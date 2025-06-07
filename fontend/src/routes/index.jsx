import PrivateRoute from "../components/PrivateRoute"
import Dashboard from "../pages/dashboard"
import Transaction from "../pages/transaction"
import Setting from "../pages/setting"
import AccPage from "../pages/accPage"
import Login from "../pages/auth/logIn"
import Register from "../pages/auth/register"

export const routes = [
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },

    {
        path: "/",
        element: <PrivateRoute />,
        children: [
            {
                path: "/",
                element: <Dashboard />,
            },
            {
                path: "transactions",
                element: <Transaction />,
            },
            {
                path: "settings",
                element: <Setting />,
            },
            {
                path: "account",
                element: <AccPage />,
            },
        ],
    },
]
