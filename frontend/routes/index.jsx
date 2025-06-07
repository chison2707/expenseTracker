import Login from "../pages/Login";
import Register from "../pages/Register";

export const routes = [
    {
        path: "login",
        element: <Login />
    },
    {
        path: "register",
        element: <Register />
    },
    // {
    //     path: "/",
    //     element: <LayoutDefault />,
    //     children: [
    //         {
    //             path: "/",
    //             element: <Home />
    //         },
    //         {
    //             path: "login",
    //             element: <Login />
    //         },
    //         {
    //             path: "register",
    //             element: <Register />
    //         },
    //         {
    //             path: "logout",
    //             element: <Logout />
    //         },
    //         {
    //             element: <PrivateRoute />,
    //             children: [
    //                 {
    //                     path: "answers",
    //                     element: <Answers />
    //                 },
    //                 {
    //                     path: "quiz",
    //                     element: <Quiz />
    //                 },
    //                 {
    //                     path: "result",
    //                     element: <Result />
    //                 },
    //                 {
    //                     path: "topic",
    //                     element: <Topic />
    //                 }
    //             ]
    //         }
    //     ]
    // }
]