import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "../components/PrivateRoute";
import Dashboard from "../pages/Dashboard";
import LayoutDefault from "../Layout/LayoutDefault";
import Logout from "../pages/Logout";
import EditUser from "../pages/EditUser";
import Accounts from "../pages/Accounts";

export const routes = [
    {
        path: "login",
        element: <Login />
    },
    {
        path: "register",
        element: <Register />
    },
    {
        path: "/",
        element: <PrivateRoute />,
        children: [
            {
                element: <LayoutDefault />,
                children: [
                    {
                        path: "/",
                        element: <Dashboard />
                    },
                    {
                        path: "/logout",
                        element: <Logout />
                    },
                    {
                        path: "/editUser",
                        element: <EditUser />
                    },
                    {
                        path: "/accounts",
                        element: <Accounts />
                    }
                ]
            }
        ]
    }
]