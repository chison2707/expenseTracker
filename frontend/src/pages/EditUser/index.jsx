import { useEffect, useState } from "react"
import { deleteAllCookie, getCookie } from "../../helpers/cookie";
import { changePass, detail, editUser } from "../../services/userService";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { checkLogin } from "../../action/login";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { message } from "antd";

const EditUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = getCookie("token");

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      const result = await detail(token);
      if (result.code === 401) {
        deleteAllCookie();
        navigate("/login");
        dispatch(checkLogin(false));
        return
      }
      setData(result);
    };


    fetchDashboard();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const lastName = e.target[0].value;
    const firstName = e.target[1].value;
    const phoneNumber = e.target[3].value;

    const options = {
      lastName: lastName,
      firstName: firstName,
      phoneNumber: phoneNumber
    }

    const result = await editUser(options, token);

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

  const handleChangePassword = async () => {
    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

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
    navigate("/");
  };


  if (!data?.infor) {
    return <Skeleton count={3} />;
  }

  return (
    <>
      <div className="p-2 bg-gray-50 min-2xl-screen flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg min-w-8/12 m-3">
          <h2 className="text-2xl font-bold text-left text-gray-400 mb-6">Chỉnh sửa thông tin cá nhân</h2>
          <hr className="text-gray-300" />

          <p className="text-l mt-6 font-bold text-left text-black mb-6">Chỉnh sửa thông tin cá nhân</p>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 m-5">
              <div className="mb-4">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-400">
                  Họ của bạn
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  defaultValue={data.infor.lastname}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 "
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-400">
                  Tên của bạn
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  defaultValue={data.infor.firstname}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 m-5">
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={data.infor.email}
                  disabled
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 "
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-400">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  defaultValue={data.infor.phone_number}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 m-5">
              <div className="mb-4">
                <label htmlFor="country" className="block text-sm font-medium text-gray-400">
                  Đất nước
                </label>
                <input
                  type="text"
                  id="country"
                  value={data.infor.country}
                  disabled
                  name="country"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 "
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="currency" className="block text-sm font-medium text-gray-400">
                  Đơn vị tiền tệ
                </label>
                <input
                  type="text"
                  id="currency"
                  disabled
                  name="currency"
                  value={data.infor.currency}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
              </div>
            </div>
            <hr className="text-gray-300" />
            <p className="text-l mt-6 font-bold text-left text-black mb-6">Thay đổi mật khẩu</p>

            <div className="grid grid-cols-1 gap-4 m-5">
              <div className="mb-4">
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-400">
                  Mật khẩu hiện tại
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 "
                />
              </div>
              <div className="mb-6">
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-400">
                  Mật Khẩu mới
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400">
                  Xác nhận mật Khẩu mới
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>

            <div className="flex flex-row-reverse ">
              <button
                type="submit"
                className="w-32 ml-5 bg-indigo-400 text-white py-2 px-4 rounded-md hover:bg-violet-700 transition duration-200"
              >
                Chỉnh sửa
              </button>
              <button
                type="button"
                onClick={handleChangePassword}
                className="w-45 ml-5 bg-indigo-400 text-white py-2 px-4 rounded-md hover:bg-violet-700 transition duration-200"
              >
                Thay đổi mật khẩu
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditUser