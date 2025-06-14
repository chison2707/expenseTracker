import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useEffect, useState } from "react";
import { Form, InputNumber, message, Modal, Select } from "antd";
import { getAccount } from "../../services/accountService";
import { tranferMoney } from "../../services/transaction";

const ButtonDt = (props) => {
    const { data, token } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [account, setAccount] = useState([]);

    const showModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        const fetchAccount = async () => {
            const result = await getAccount(token);

            setAccount(result.data);
        };


        fetchAccount();
    }, []);

    const handleExport = () => {
        if (!data?.data?.length) return;

        const exportData = data.data.map(item => ({
            Date: new Date(item.createdat).toLocaleDateString("vi-VN"),
            Description: item.description,
            Status: item.status,
            Source: item.source,
            Amount: item.amount
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(blob, `transactions_${new Date().toISOString().slice(0, 10)}.xlsx`);
    };

    const handleSubmit = async (e) => {
        const fromAccount = e.fromAccount;
        const toAccount = e.toAccount;
        const amount = e.amount;

        const options = {
            fromAccount: fromAccount,
            toAccount: toAccount,
            amount: amount
        }
        console.log(fromAccount, toAccount, amount);

        const result = await tranferMoney(options, token);

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

        console.log(result);

        message.success(result.message);
        form.resetFields();
        closeModal();
    };

    return (
        <>
            <div className="ml-auto flex gap-2">
                <button
                    className="bg-black text-white px-4 py-1 rounded text-sm cursor-pointer hover:bg-white hover:text-black"
                    onClick={showModal}
                >
                    + Pay
                </button>

                <button
                    className="bg-slate-50 text-sm text-gray-600 underline cursor-pointer hover:bg-slate-100"
                    onClick={handleExport}
                >
                    Export
                </button>
            </div>

            <Modal
                title="Thêm nguồn tiền"
                open={isModalOpen}
                onCancel={closeModal}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item
                        name="fromAccount"
                        label="Tài khoản chuyển tiền"
                    >
                        <Select
                            style={{ width: '100%' }}
                        >
                            {account.map((acc) => (
                                <Select.Option value={acc.id}>{acc.account_name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="toAccount"
                        label="Tài khoản nhận tiền"
                    >
                        <Select
                            style={{ width: '100%' }}
                        >
                            {account.map((acc) => (
                                <Select.Option value={acc.id}>{acc.account_name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Số tiền" name="amount">
                        <InputNumber
                            min={1000}
                            style={{ width: '100%' }}
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|,/g, '')}
                        />
                    </Form.Item>

                    <Form.Item>
                        <div className="text-right">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Submit
                            </button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ButtonDt;
