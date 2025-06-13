import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getTransaction } from "../../services/transaction";
import { deleteAllCookie, getCookie } from "../../helpers/cookie";
import { checkLogin } from "../../action/login";
import { useDispatch } from "react-redux";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { formatCurrency } from "../../helpers/formatCurrency";

const Transaction = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const pageFromUrl = parseInt(queryParams.get("page")) || 1;
  const sFromUrl = queryParams.get("s") || "";

  const [page, setPage] = useState(pageFromUrl);
  const [search, setSearch] = useState(sFromUrl);

  const [data, setData] = useState([]);
  const token = getCookie("token");

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= data.totalPage) {
      setPage(newPage);

      const params = new URLSearchParams(location.search);
      params.set("page", newPage);

      navigate({ search: params.toString() });
    }
  };

  const handleInput = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const params = new URLSearchParams(location.search);
      params.set("s", search);
      navigate({ search: params.toString() });
    }
  }

  useEffect(() => {
    const fetchTransaction = async () => {
      const result = await getTransaction(token, { page, search });
      if (result.code === 401) {
        deleteAllCookie();
        navigate("/login");
        dispatch(checkLogin(false));
      }
      setData(result);
    };


    fetchTransaction();
  }, [page, search])

  if (!data?.data) {
    return <Skeleton count={3} />;
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <h2 className="text-2xl font-semibold mb-6">Transactions Activity</h2>

        <div className="flex flex-wrap gap-4 items-center mb-6">
          <div className="flex items-center gap-2 text-sm">
            <label>Filter</label>
            <input type="date" className="border rounded px-2 py-1" defaultValue="2024-09-08" />
            <span>to</span>
            <input type="date" className="border rounded px-2 py-1" defaultValue="2024-09-18" />
          </div>

          <input
            type="text"
            placeholder="Search now..."
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleInput}
            className="border px-3 py-1 rounded text-sm w-64"
          />

          <div className="ml-auto flex gap-2">
            <button className="bg-black text-white px-4 py-1 rounded text-sm">+ Pay</button>
            <button className="text-sm text-gray-600 underline">Export</button>
          </div>
        </div>

        <div className="overflow-x-auto">
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

          <div className="flex justify-center items-center mt-6">
            <nav className="inline-flex items-center gap-2">
              <button
                className={`px-3 py-1 rounded border text-sm transition ${data.currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100"
                  }`}
                disabled={data.currentPage === 1}
                onClick={() => handlePageChange(data.currentPage - 1)}
              >
                Previous
              </button>

              {Array.from({ length: data.totalPage || 1 }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded border text-sm transition-all duration-200 ${data.currentPage === page
                    ? "bg-black text-white font-semibold"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  {page}
                </button>
              ))}

              <button
                className={`px-3 py-1 rounded border text-sm transition ${data.currentPage === data.totalPage
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100"
                  }`}
                disabled={data.currentPage === data.totalPage}
                onClick={() => handlePageChange(data.currentPage + 1)}
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}

export default Transaction