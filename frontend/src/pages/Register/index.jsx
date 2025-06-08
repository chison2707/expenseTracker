import '@ant-design/v5-patch-for-react-19';
import { message } from "antd";
import { setCookie } from "../../helpers/cookie";
import { register } from "../../services/userService";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkLogin } from '../../action/login';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target[0].value;
        const lastName = e.target[1].value;
        const firstName = e.target[2].value;
        const phoneNumber = e.target[3].value;
        const password = e.target[4].value;
        const confirmPassword = e.target[5].value;

        const options = {
            lastName: lastName,
            firstName: firstName,
            phoneNumber: phoneNumber,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }

        const result = await register(options);

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
        navigate("/")
        setCookie("token", result.user.tokenuser, 1);
        dispatch(checkLogin(true));
    }

    return (
        <>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Đăng ký tài khoản</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Nhập email của bạn"
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Họ của bạn</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Nhập họ của bạn"
                            />
                        </div>
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Tên của bạn</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Nhập tên của bạn"
                            />
                        </div>
                        <div>
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Nhập số điện thoại"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mật khẩu</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Nhập mật khẩu"
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Xác nhận mật khẩu</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Nhập lại mật khẩu"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Đăng ký
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register