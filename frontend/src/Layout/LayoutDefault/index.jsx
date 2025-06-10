import { Link, NavLink, Outlet } from "react-router-dom";
import "./layoutDefault.scss";
import { useSelector } from "react-redux";

function LayoutDefault() {
    const isLogin = useSelector(state => state.loginReducer);
    console.log("Is Login:", isLogin);

    return (
        <>
            <div className="layout-default">
                <header className="layout-default__header">
                    <div className="layout-default__logo">
                        <Link to="/" >
                            <img className="w-13 rounded-full outline-black" src="../../../public/logo.png" alt="logo" />
                        </Link>
                    </div>
                    <div className="layout-default__menu">
                        <ul>
                            <li>
                                <NavLink to="/">
                                    Dashboard
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/transactions">
                                    Giao dịch
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/accounts">
                                    Nguồn tiền
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/settings">
                                    Cài đặt
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="layout-default__account">
                        <>
                            <ul>
                                <li>
                                    <NavLink to="/logout">
                                        logout
                                    </NavLink>
                                </li>
                            </ul>
                        </>
                    </div>
                </header>
                <main className="layout-default__main">
                    <Outlet />
                </main>
                <footer className="layout-default__footer">
                    Copyright @ 2025 by Chi Son
                </footer>
            </div>
        </>
    )
}
export default LayoutDefault;