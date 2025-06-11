import { NavLink, useNavigate } from 'react-router-dom'
import { changePass } from '../../services/userService';
import { getCookie } from '../../helpers/cookie';
import { message } from 'antd';

const ChangePass = () => {
  const navigate = useNavigate();
  const token = getCookie("token")

  const handelSubmit = async (e) => {
    e.preventDefault();
    const currentPassword = e.target[0].value;
    const newPassword = e.target[1].value;
    const confirmPassword = e.target[2].value;

    const options = {
      currentPassword: currentPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword
    }

    const result = await changePass(options, token)

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

  }

  return (
    <>
      <div className="min-xl-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Thay đổi mật khẩu</h2>
          <form onSubmit={handelSubmit}>
            <div className="mb-4">
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                Mật khẩu hiện tại
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-50"
                placeholder="Nhập mật khẩu hiện tại của bạn"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                Mật Khẩu mới
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-50"
                placeholder="Nhập mật khẩu mới"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Xác nhận mật Khẩu mới
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-50"
                placeholder="Xác nhận lại mật khẩu mới"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Thay đổi mật khẩu
            </button>
            <div className="mt-4 text-center">
              <NavLink to="/editUser" className="text-sm text-blue-600 hover:underline">
                Trở về trang trước
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ChangePass