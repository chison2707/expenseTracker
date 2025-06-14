import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ButtonDt = (props) => {
    const { data } = props;
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
    return (
        <>
            <div className="ml-auto flex gap-2">
                <button className="bg-black text-white px-4 py-1 rounded text-sm">+ Pay</button>
                <button className="bg-slate-50 text-sm text-gray-600 underline cursor-pointer hover:bg-slate-50" onClick={handleExport}>Export</button>
            </div>
        </>
    )
}

export default ButtonDt