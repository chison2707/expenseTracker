import { Card, Col, Row } from "antd"
import { useEffect, useState } from "react";
import { AiOutlineDollarCircle, AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import { deleteAllCookie, getCookie } from "../../helpers/cookie";
import { dashboard } from "../../services/dashboardService";
import { formatCurrency } from "../../helpers/formatCurrency";
import { Line, Pie } from '@ant-design/plots';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkLogin } from "../../action/login";

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = getCookie("token");

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchDashboard = async () => {
            const result = await dashboard(token);
            if (result.code === 401) {
                deleteAllCookie();
                navigate("/login");
                dispatch(checkLogin(false));
            }
            setData(result);
        };

        console.log(data);

        fetchDashboard();
    }, []);

    const transformedChartData = data.chartData?.flatMap(item => [
        {
            month: item.month,
            value: parseInt(item.income),
            type: 'Thu nhập',
        },
        {
            month: item.month,
            value: parseInt(item.expense),
            type: 'Chi tiêu',
        },
    ]);

    const config = {
        data: transformedChartData,
        xField: "month",
        yField: "value",
        sizeField: 'value',
        shapeField: 'trail',
        legend: { size: false },
        colorField: 'type',
    };

    const configPie = {
        data: [
            { type: 'Tổng chi tiêu', value: parseInt(data.totalExpense) },
            { type: 'Tổng thu nhập', value: parseInt(data.totalIncome) },
        ],
        angleField: 'value',
        colorField: 'type',
        label: {
            text: ({ value }) => formatCurrency(value),
            style: {
                fontWeight: 'bold',
            },
        },
        legend: {
            color: {
                title: false,
                position: 'right',
                rowPadding: 5,
            },
        },
    }

    return (
        <>
            <div className="p-2 bg-gray-50 min-h-screen">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                    <p className="text-sm text-gray-500">Theo dõi hoạt động tài chính của bạn</p>
                </div>

                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <Card>
                            <div className="flex items-center gap-4">
                                <AiOutlineDollarCircle size={32} className="text-blue-500" />
                                <div>
                                    <p className="text-gray-500">Số dư</p>
                                    <p className="text-xl font-semibold">{formatCurrency(data.availableBalance)}</p>
                                    <p className="text-xs text-gray-400">Tổng số dư hiện tại</p>
                                </div>
                            </div>
                        </Card>
                    </Col>

                    <Col xs={24} md={8}>
                        <Card>
                            <div className="flex items-center gap-4">
                                <AiOutlineArrowUp size={32} className="text-green-500" />
                                <div>
                                    <p className="text-gray-500">Tổng thu nhập</p>
                                    <p className="text-xl font-semibold">{formatCurrency(data.totalIncome)}</p>
                                    <p className="text-xs text-gray-400">Tổng thu nhập</p>
                                </div>
                            </div>
                        </Card>
                    </Col>

                    <Col xs={24} md={8}>
                        <Card>
                            <div className="flex items-center gap-4">
                                <AiOutlineArrowDown size={32} className="text-red-500" />
                                <div>
                                    <p className="text-gray-500">Tổng chi tiêu</p>
                                    <p className="text-xl font-semibold">{formatCurrency(data.totalExpense)}</p>
                                    <p className="text-xs text-gray-400">Tổng chi tiêu</p>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>

                <div className="mt-5">
                    <h2 className="text-l font-bold text-gray-800 mb-3">Biểu đồ thống kê thu chi</h2>
                    <Row gutter={[16, 16]}>
                        <Col md={16}>
                            <Line {...config} />
                        </Col>
                        <Col md={8}>
                            <Pie {...configPie} />
                        </Col>
                    </Row>
                </div>

                <div className="mt-5">
                    <h2 className="text-lg font-bold text-gray-800 mb-3">Những giao dịch gần đây</h2>
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border border-gray-300 rounded-lg text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border px-4 py-2 text-left">Ngày giao dịch</th>
                                    <th className="border px-4 py-2 text-left">Chi tiết</th>
                                    <th className="border px-4 py-2 text-left">Trạng thái</th>
                                    <th className="border px-4 py-2 text-left">Nguồn</th>
                                    <th className="border px-4 py-2 text-right">Số tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.lastTransactions && data.lastTransactions.length > 0 ? (
                                    data.lastTransactions.map((transaction) => (
                                        <tr key={transaction.id} className="hover:bg-gray-50">
                                            <td className="border px-4 py-2">
                                                {new Date(transaction.createdat).toLocaleDateString()}
                                            </td>
                                            <td className="border px-4 py-2">{transaction.description}</td>
                                            <td className="border px-4 py-2">
                                                <span
                                                    className={`inline-block px-2 py-1 rounded text-xs font-medium ${transaction.status === 'Hoàn tất'
                                                        ? 'bg-green-100 text-green-700'
                                                        : transaction.status === 'Đang xử lý'
                                                            ? 'bg-yellow-100 text-yellow-700'
                                                            : 'bg-red-100 text-red-700'
                                                        }`}
                                                >
                                                    {transaction.status}
                                                </span>
                                            </td>
                                            <td className="border px-4 py-2">{transaction.source}</td>
                                            <td className="border px-4 py-2 text-right">
                                                {formatCurrency(parseFloat(transaction.amount))}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4 text-gray-500">
                                            Không có dữ liệu
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Dashboard