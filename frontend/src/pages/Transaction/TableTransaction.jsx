import React from 'react'
import { formatCurrency } from '../../helpers/formatCurrency';

const TableTransaction = (props) => {
    const { data } = props;
    return (
        <>
            <table className="min-w-full bg-white shadow rounded">
                <thead>
                    <tr className="text-left text-sm border-b bg-gray-100">
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Description</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Source</th>
                        <th className="py-3 px-4">Amount</th>
                        <th className="py-3 px-4"></th>
                    </tr>
                </thead>
                <tbody>
                    {data.data.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50 text-sm">
                            <td className="py-3 px-4 whitespace-nowrap">{new Date(item.createdat).toLocaleDateString("vi-VN")}</td>
                            <td className="py-3 px-4">{item.description}</td>
                            <td className="py-3 px-4">
                                <span className="text-green-600 font-medium">● {item.status}</span>
                            </td>
                            <td className="py-3 px-4">{item.source}</td>
                            <td className="py-3 px-4 font-medium">
                                <span className={item.amount.startsWith("-") ? "text-red-500" : "text-green-600"}>
                                    {formatCurrency(item.amount)}
                                </span>
                            </td>
                            <td className="py-3 px-4 text-indigo-600 hover:underline cursor-pointer">View</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default TableTransaction