import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../../services/userService";
import { setCookie } from "../../helpers/cookie";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../action/login";
import { message } from "antd";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        const result = await login({ email, password });

        if (result.status === 422) {
            result.errors.forEach(err => {
                message.error(err);
            });
            return;
        }

        if (result.status === 400) {
            message.error(result.message);
            return;
        }

        message.success(result.message);
        navigate("/");
        setCookie("token", result.token, 1);
        dispatch(checkLogin(true));
    }
    return (
        <>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Đăng Nhập</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Nhập email của bạn"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Mật Khẩu
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Nhập mật khẩu"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
                        >
                            Đăng Nhập
                        </button>
                        <div className="mt-4 text-center">
                            <NavLink to="/register" className="text-sm text-blue-600 hover:underline">
                                Đăng ký
                            </NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
