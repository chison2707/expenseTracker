import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getTransaction } from "../../services/transaction";
import { deleteAllCookie, getCookie } from "../../helpers/cookie";
import { checkLogin } from "../../action/login";
import { useDispatch } from "react-redux";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import TableTransaction from "./TableTransaction";
import Pagination from "./Pagination";
import Search from "./Search";
import Datetime from "./Datetime";
import ButtonDt from "./ButtonDt";


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

  const fetchTransaction = async () => {
    const result = await getTransaction(token, { page, search, startDate, endDate });
    if (result.code === 401) {
      deleteAllCookie();
      navigate("/login");
      dispatch(checkLogin(false));
    }
    setData(result);
  };

  useEffect(() => {
    fetchTransaction();
  }, [page, search, startDate, endDate]);

  const handleReload = () => {
    fetchTransaction();
  }

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

          <ButtonDt data={data} token={token} onReload={handleReload} />
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