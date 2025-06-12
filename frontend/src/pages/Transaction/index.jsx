const Transaction = () => {
  const transactions = [
    {
      date: "Sun Sep 15 2024",
      description: "Youtube support codewave",
      status: "Completed",
      source: "Cash",
      amount: "-BGN 500.00",
    },
    {
      date: "Sun Sep 15 2024",
      description: "Received (Cash - Crypto)",
      status: "Completed",
      source: "Crypto",
      amount: "+BGN 100.00",
    },
    {
      date: "Sun Sep 15 2024",
      description: "Transfer (Cash - Crypto)",
      status: "Completed",
      source: "Cash",
      amount: "-BGN 100.00",
    },
    {
      date: "Sun Sep 15 2024",
      description: "Crypto (Deposit)",
      status: "Completed",
      source: "Crypto",
      amount: "+BGN 10.00",
    },
    {
      date: "Sun Sep 15 2024",
      description: "Crypto (Deposit)",
      status: "Completed",
      source: "Crypto",
      amount: "+BGN 90.00",
    },
    {
      date: "Sun Sep 15 2024",
      description: "Crypto (Initial Deposit)",
      status: "Completed",
      source: "Crypto",
      amount: "+BGN 10.00",
    },
    {
      date: "Sun Sep 15 2024",
      description: "Cash (Initial Deposit)",
      status: "Completed",
      source: "Cash",
      amount: "+BGN 1,000.00",
    },
  ];


  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <h2 className="text-2xl font-semibold mb-6">Transactions Activity</h2>

        {/* Filters */}
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
            className="border px-3 py-1 rounded text-sm w-64"
          />

          <div className="ml-auto flex gap-2">
            <button className="bg-black text-white px-4 py-1 rounded text-sm">+ Pay</button>
            <button className="text-sm text-gray-600 underline">Export</button>
          </div>
        </div>

        {/* Table */}
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
              {transactions.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 text-sm">
                  <td className="py-3 px-4 whitespace-nowrap">{item.date}</td>
                  <td className="py-3 px-4">{item.description}</td>
                  <td className="py-3 px-4">
                    <span className="text-green-600 font-medium">● {item.status}</span>
                  </td>
                  <td className="py-3 px-4">{item.source}</td>
                  <td className="py-3 px-4 font-medium">
                    <span className={item.amount.startsWith("-") ? "text-red-500" : "text-green-600"}>
                      {item.amount}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-indigo-600 hover:underline cursor-pointer">View</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Transaction