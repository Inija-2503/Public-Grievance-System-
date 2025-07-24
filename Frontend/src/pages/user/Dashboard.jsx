import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    // Fetch recent complaints (replace with your API endpoint)
    axios.get("http://localhost:5000/api/complaints").then((res) => {
      setComplaints(res.data);
    });
  }, []);

  const stats = [
    { title: "Total Complaints", value: complaints.length },
    {
      title: "Pending",
      value: complaints.filter((c) => c.status === "Pending").length,
    },
    {
      title: "Resolved",
      value: complaints.filter((c) => c.status === "Resolved").length,
    },
  ];

  return (
    <div className="p-6 bg-[#CCDDEA] min-h-screen mb-7  rounded-md shadow-lg">
      <h1 className="text-3xl font-bold text-[#2772A0] mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded shadow text-center border-l-4 border-[#2772A0]"
          >
            <h2 className="text-xl text-[#2772A0] font-semibold">
              {stat.title}
            </h2>
            <p className="text-2xl font-bold text-gray-700 mt-2">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Complaints Table */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold text-[#2772A0] mb-4">
          Recent Complaints
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-[#2772A0] text-white">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {complaints.slice(0, 5).map((c, idx) => (
                <tr
                  key={idx}
                  className="border-t border-gray-200 hover:bg-gray-100"
                >
                  <td className="px-4 py-2">{c.name}</td>
                  <td className="px-4 py-2">{c.category || "General"}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        c.status === "Resolved"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
              {complaints.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500">
                    No complaints found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
