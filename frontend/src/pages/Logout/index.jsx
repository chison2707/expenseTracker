import { useDispatch } from "react-redux"
import { deleteAllCookie } from "../../helpers/cookie";
import { useEffect } from "react";
import { checkLogin } from "../../action/login";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    deleteAllCookie();

    useEffect(() => {
        navigate("/login");
        dispatch(checkLogin(false));
    }, [])

    return (
        <></>
    )
}

export default Logout