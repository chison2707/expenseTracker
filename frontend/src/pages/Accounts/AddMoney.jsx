import { Modal, Form, InputNumber } from "antd";

const AddMoney = (props) => {
    const { isOpen, onClose, onSubmit } = props;
    const [form] = Form.useForm();

    const handleFinish = (e) => {
        onSubmit(e);
        form.resetFields();
    };

    return (
        <>
            <Modal
                title="Thêm khoản tiền"
                open={isOpen}
                onCancel={onClose}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleFinish}>
                    <Form.Item label="Số tiền" name="amount">
                        <InputNumber min={1000} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item>
                        <div className="text-right">
                            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                Thêm
                            </button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default AddMoney