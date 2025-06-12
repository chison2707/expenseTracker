import { useEffect } from "react";
import { useState } from "react";
import { createAccount, getAccount } from "../../services/accountService";
import { deleteAllCookie, getCookie } from "../../helpers/cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkLogin } from "../../action/login";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { formatCurrency } from "../../helpers/formatCurrency";
import { Form, Modal, Input, InputNumber, message } from "antd";
import { createAccountac, setAccount } from "../../action/account";
import AddAcounts from "./AddAcounts";

const Accounts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = getCookie("token");

  const account = useSelector((state) => state.accountReducer);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchAccount = async () => {
      const result = await getAccount(token);
      if (result.code === 401) {
        deleteAllCookie();
        navigate("/login");
        dispatch(checkLogin(false));
      }

      dispatch(setAccount(result.data));
    };


    fetchAccount();
  }, []);

  const handleSubmit = async (e) => {
    const name = e.name;
    const account_number = e.account_number;
    const amount = e.amount;

    const options = {
      name: name,
      account_number: account_number,
      amount: amount
    }

    const result = await createAccount(options, token);
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

    dispatch(createAccountac(result.data))
    message.success(result.message);
    closeModal();
  };

  if (!account?.payload) {
    return <Skeleton count={3} />;
  }


  return (
    <>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Thông tin các nguồn tiền</h1>
          <button onClick={showModal} className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
            + Add
          </button>
          <AddAcounts
            isOpen={isModalOpen}
            onClose={closeModal}
            onSubmit={handleSubmit}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {account.payload.map((acc) => (
            <div
              key={acc.id}
              className="bg-white rounded shadow-md p-5 flex flex-col justify-between"
            >
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-lg font-bold">{acc.account_name}</h2>
              </div>

              <p className="text-sm text-gray-500">{acc.account_number}</p>
              <p className="text-sm text-gray-400 mb-2">{acc.createdat}</p>
              <p className="text-xl font-semibold mb-2">{formatCurrency(acc.account_balance)}</p>

              <div className="text-right">
                <button className="text-indigo-500 hover:underline text-sm">
                  Add Money
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Accounts