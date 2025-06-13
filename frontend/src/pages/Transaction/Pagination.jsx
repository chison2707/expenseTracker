import { useLocation, useNavigate } from "react-router-dom";

const Pagination = (props) => {
    const { data } = props
    const location = useLocation();
    const navigate = useNavigate();

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= data.totalPage) {

            const params = new URLSearchParams(location.search);
            params.set("page", newPage);
            navigate({ search: params.toString() });
        }
    };

    return (
        <>
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
        </>
    )
}

export default Pagination