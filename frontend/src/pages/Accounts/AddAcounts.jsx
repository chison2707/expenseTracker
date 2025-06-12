import { Modal, Form, Input, InputNumber } from "antd";

const AddAcounts = (props) => {
    const { isOpen, onClose, onSubmit } = props;
    const [form] = Form.useForm();

    const handleFinish = (e) => {
        onSubmit(e);
        form.resetFields();
    };

    return (
        <>
            <Modal
                title="Thêm nguồn tiền"
                open={isOpen}
                onCancel={onClose}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleFinish}>
                    <Form.Item
                        label="Tên nguồn tiền"
                        name="name"
                        rules={[{ required: true, message: 'Vui lòng nhập tên nguồn tiền!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="Số tài khoản" name="account_number">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Số tiền" name="amount">
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
        </>
    )
}

export default AddAcounts