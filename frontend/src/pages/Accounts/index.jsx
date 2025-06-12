import { useEffect } from "react";
import { useState } from "react";
import { createAccount, getAccount } from "../../services/accountService";
import { deleteAllCookie, getCookie } from "../../helpers/cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../action/login";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { formatCurrency } from "../../helpers/formatCurrency";
import { Form, Modal, Input, InputNumber, message } from "antd";

const Accounts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = getCookie("token");

  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchAccount = async () => {
      const result = await getAccount(token);
      if (result.code === 401) {
        deleteAllCookie();
        navigate("/login");
        dispatch(checkLogin(false));
      }

      setData(result);
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

    message.success(result.message);

  };

  if (!data?.data) {
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
          <Modal
            title="Basic Modal"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            <Form name="create-account" onFinish={handleSubmit}>
              <Form.Item
                label="Tên nguồn tiền"
                name="name"
                rules={[{ required: true, message: 'Vui lòng nhập tên nguồn tiền!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Số tài khoản"
                name="account_number"
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Số tiền"
                name="amount"
              >
                <InputNumber min={1000} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item>
                <div className="text-right">
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Submit
                  </button>
                </div>
              </Form.Item>
            </Form>

          </Modal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {data.data.map((acc) => (
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