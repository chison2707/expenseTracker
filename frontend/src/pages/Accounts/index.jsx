import { useEffect, useState } from "react";
import {
  addAmount,
  createAccount,
  getAccount
} from "../../services/accountService";
import {
  deleteAllCookie,
  getCookie
} from "../../helpers/cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../action/login";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { formatCurrency } from "../../helpers/formatCurrency";
import { message } from "antd";
import AddAcounts from "./AddAcounts";
import AddMoney from "./AddMoney";
import DelAcc from "./delAcc";

const Accounts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = getCookie("token");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddMoneyOpen, setIsAddMoneyOpen] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [account, setAccount] = useState([]);

  const fetchAccount = async () => {
    const result = await getAccount(token);
    if (result.code === 401) {
      deleteAllCookie();
      navigate("/login");
      dispatch(checkLogin(false));
    }

    setAccount(result.data);
  };

  useEffect(() => {
    fetchAccount();
  }, []);


  const handleReload = () => fetchAccount();

  const handleSubmit = async (e) => {
    const options = {
      name: e.name,
      account_number: e.account_number,
      amount: e.amount
    };

    const result = await createAccount(options, token);

    if (result.status === 422) {
      result.errors.forEach((err) => message.error(err));
      return;
    }

    if (result.status === 400) {
      message.error(result.message);
      return;
    }

    message.success(result.message);
    closeModal();
    handleReload();
  };

  const handleSubmitAmount = async (id, e) => {
    const amount = e.amount;
    const result = await addAmount(id, { amount }, token);

    if (result.status === 422) {
      result.errors.forEach((err) => message.error(err));
      return;
    }

    if (result.status === 400) {
      message.error(result.message);
      return;
    }

    message.success(result.message);
    setIsAddMoneyOpen(false);
    handleReload();
  };

  const openAddMoneyModal = (id) => {
    setSelectedAccountId(id);
    setIsAddMoneyOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsAddMoneyOpen(false);
    setSelectedAccountId(null);
  };

  if (!account) {
    return <Skeleton count={3} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Thông tin các nguồn tiền</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          + Add
        </button>
        <AddAcounts
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleSubmit}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {account.map((acc) => (
          <div
            key={acc.id}
            className="bg-white rounded shadow-md p-5 flex flex-col justify-between"
          >
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-lg font-bold">{acc.account_name}</h2>
            </div>

            <p className="text-sm text-gray-500">{acc.account_number}</p>
            <p className="text-sm text-gray-400 mb-2">{acc.createdat}</p>
            <p className="text-xl font-semibold mb-2">
              {formatCurrency(acc.account_balance)}
            </p>

            <div className="text-right flex justify-end gap-3">
              <DelAcc token={token} acc={acc} handleReload={handleReload} />
              <button
                onClick={() => openAddMoneyModal(acc.id)}
                className="text-indigo-500 hover:underline text-sm cursor-pointer"
              >
                Add Money
              </button>
            </div>
          </div>
        ))}
      </div>

      <AddMoney
        isOpen={isAddMoneyOpen}
        onClose={closeModal}
        onSubmit={(formData) =>
          handleSubmitAmount(selectedAccountId, formData)
        }
      />
    </div>
  );
};

export default Accounts;
