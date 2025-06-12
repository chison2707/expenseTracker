import { Form } from "antd"


const AddAcounts = () => {
    const handleSubmit = (values) => {
        console.log("Giá trị form:", values);
    };

    return (
        <>
            <Form name="create-room"
                // form={form}
                onFinish={handleSubmit}
            // initialValues={record}
            >
                <Form.Item
                    label="Tên phòng"
                    name="roomName"
                    rules={[{ required: true, message: 'Vui lòng nhập tên phòng!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Số người tối đa"
                    name="quantityPeople"
                >
                    <InputNumber min={1} />
                </Form.Item>

                <Form.Item
                    label="Mô tả"
                    name="description"
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    name="services"
                    noStyle
                >
                    <Select
                        style={{ width: '100%' }}
                        mode="multiple"
                    >
                        <Option value="wifi">Wifi</Option>
                        <Option value="projector">Máy chiếu</Option>
                        <Option value="whiteboard">Bảng trắng</Option>
                        <Option value="refreshments">Đồ uống</Option>
                    </Select>
                </Form.Item>

                <Form.Item valuePropName="checked" label="Trạng thái" name="status">
                    <Switch />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">Cập nhật</Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default AddAcounts