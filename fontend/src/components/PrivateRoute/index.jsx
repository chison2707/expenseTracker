import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
    const user = null;
    return !user ? (
        <Navigate to="login" replace={true} />
    ) : (
        <>
            <div>
                <Outlet />
            </div>
        </>
    );
}

export default PrivateRoute;
