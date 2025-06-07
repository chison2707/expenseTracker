import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
    const isLogin = useSelector(state => state.loginReducer);

    return isLogin ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
