import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "../components/PrivateRoute";
import Dashboard from "../pages/Dashboard";

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
                path: "/",
                element: <Dashboard />
            },
            // {
            //     path: "login",
            //     element: <Login />
            // },
            // {
            //     path: "register",
            //     element: <Register />
            // },
            // {
            //     path: "logout",
            //     element: <Logout />
            // },
            // {
            //     element: <PrivateRoute />,
            //     children: [
            //         {
            //             path: "answers",
            //             element: <Answers />
            //         },
            //         {
            //             path: "quiz",
            //             element: <Quiz />
            //         },
            //         {
            //             path: "result",
            //             element: <Result />
            //         },
            //         {
            //             path: "topic",
            //             element: <Topic />
            //         }
            //     ]
            // }
        ]
    }
]