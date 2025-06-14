import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getTransaction } from "../../services/transaction";
import { deleteAllCookie, getCookie } from "../../helpers/cookie";
import { checkLogin } from "../../action/login";
import { useDispatch } from "react-redux";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import TableTransaction from "./TableTransaction";
import Pagination from "./pagination";
import Search from "./Search";
import Datetime from "./Datetime";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Transaction = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const pageFromUrl = parseInt(queryParams.get("page")) || 1;
  const sFromUrl = queryParams.get("s") || "";
  const startDateFromUrl = queryParams.get("df") || "";
  const endDateFromUrl = queryParams.get("dt") || "";

  const [page, setPage] = useState(pageFromUrl);
  const [search, setSearch] = useState(sFromUrl);
  const [startDate, setStartDate] = useState(startDateFromUrl);
  const [endDate, setEndDate] = useState(endDateFromUrl || new Date().toISOString().split("T")[0]);

  const [data, setData] = useState([]);
  const token = getCookie("token");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setPage(parseInt(params.get("page")) || 1);
    setSearch(params.get("s") || "");
    setStartDate(params.get("df") || "");
    setEndDate(params.get("dt") || new Date().toISOString().split("T")[0]);
  }, [location.search]);

  useEffect(() => {
    const fetchTransaction = async () => {
      const result = await getTransaction(token, { page, search, startDate, endDate });
      if (result.code === 401) {
        deleteAllCookie();
        navigate("/login");
        dispatch(checkLogin(false));
      }
      setData(result);
    };


    fetchTransaction();
  }, [page, search, startDate, endDate]);

  const handleExport = () => {
    if (!data?.data?.length) return;

    // Format dữ liệu
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

  if (!data?.data) {
    return <Skeleton count={3} />;
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <h2 className="text-2xl font-semibold mb-6">Transactions Activity</h2>

        <div className="flex flex-wrap gap-4 items-center mb-6">
          <Datetime setStartDate={setStartDate} setEndDate={setEndDate} />

          <Search setSearch={setSearch} />

          <div className="ml-auto flex gap-2">
            <button className="bg-black text-white px-4 py-1 rounded text-sm">+ Pay</button>
            <button className="bg-slate-50 text-sm text-gray-600 underline cursor-pointer hover:bg-slate-50" onClick={handleExport}>Export</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <TableTransaction data={data} />

          <Pagination data={data} />
        </div>
      </div>
    </>
  )
}

export default Transaction