const Accounts = () => {
    const accounts = [
        {
            type: "Cash",
            icon: "💰",
            color: "bg-red-500",
            number: "5480*****3081",
            date: "Sunday, September 15, 2024",
            amount: "BGN 1,000.00",
        },
        {
            type: "Crypto",
            icon: "₿",
            color: "bg-yellow-500",
            number: "4852*****2419",
            date: "Sunday, September 15, 2024",
            amount: "BGN 110.00",
        },
    ];
    return (
        <>
            <div className="min-h-screen bg-gray-100 p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">Thông tin các nguồn tiền</h1>
                    <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
                        + Add
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {accounts.map((acc, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded shadow-md p-5 flex flex-col justify-between"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div
                                    className={`w-10 h-10 flex items-center justify-center text-white rounded-full text-xl ${acc.color}`}
                                >
                                    {acc.icon}
                                </div>
                                <h2 className="text-lg font-bold">{acc.type}</h2>
                                <span className="text-green-500 text-sm">✔</span>
                            </div>

                            <p className="text-sm text-gray-500">{acc.number}</p>
                            <p className="text-sm text-gray-400 mb-2">{acc.date}</p>
                            <p className="text-xl font-semibold mb-2">{acc.amount}</p>

                            <div className="text-right">
                                <button className="text-indigo-500 hover:underline text-sm">
                                    Add Money
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Accounts