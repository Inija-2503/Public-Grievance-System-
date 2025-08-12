import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchDashboardStats } from "../../features/admin/dashboardSlice";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import ReportDetailModal from "../../components/ReportDetailModal";

// Register the necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { stats, recentComplaints, loading, error } = useSelector(
    (state) => state.dashboard
  );
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);
  const handleViewDetails = (complaint) => {
    setSelectedComplaint(complaint);
  };
  const closeModal = () => {
    setSelectedComplaint(null);
  };

  const chartData = {
    labels: ["Pending", "Resolved", "Rejected", "Admin Verify"],
    datasets: [
      {
        label: "# of Complaints",
        data: [
          stats.pendingComplaints,
          stats.resolvedComplaints,
          stats.rejectedComplaints,
          stats.adminVerifyComplaints,
        ],
        backgroundColor: [
          "rgba(255, 206, 86, 0.7)", // Yellow
          "rgba(75, 192, 192, 0.7)", // Green
          "rgba(255, 99, 132, 0.7)", // Red
          "rgba(54, 162, 235, 0.7)", // Blue
        ],
        borderColor: [
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  if (loading)
    return <div className="p-6 text-center">Loading Dashboard...</div>;
  if (error)
    return <div className="p-6 text-center text-red-600">Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-gray-200 p-4 rounded shadow">
          <h2 className="font-bold text-gray-600">Total Complaints</h2>
          <p className="text-3xl">{stats.totalComplaints}</p>
        </div>
        <div className="bg-gray-200 p-4 rounded shadow">
          <h2 className="font-bold text-gray-600">Pending</h2>
          <p className="text-3xl">{stats.pendingComplaints}</p>
        </div>
        <div className="bg-gray-200 p-4 rounded shadow">
          <h2 className="font-bold text-gray-600">Resolved</h2>
          <p className="text-3xl">{stats.resolvedComplaints}</p>
        </div>
        <div className="bg-gray-200 p-4 rounded shadow">
          <h2 className="font-bold text-gray-600">Rejected</h2>
          <p className="text-3xl">{stats.rejectedComplaints}</p>
        </div>
        <div className="bg-gray-200 p-4 rounded shadow">
          <h2 className="font-bold text-gray-600">Admin Verify</h2>
          <p className="text-3xl">{stats.adminVerifyComplaints}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pie Chart */}
        <div className="lg:col-span-1 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Complaint Status</h2>
          <div style={{ height: "300px", width: "300px", margin: "auto" }}>
            <Pie data={chartData} />
          </div>
        </div>

        {/* Recent Complaints Table */}
        <div className="lg:col-span-2 bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Recent Complaints</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Ticket Number</th>
                  <th className="p-2 text-left">User Name</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentComplaints.map((c) => (
                  <tr key={c.ticketNumber} className="border-b">
                    <td className="p-2">{c.ticketNumber}</td>
                    <td className="p-2">{c.name}</td>
                    <td className="p-2">{c.status}</td>
                    <td className="p-2">
                      <button
                        onClick={() => handleViewDetails(c)}
                        className="text-blue-600 hover:underline"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={() => navigate("/admin/reports")}
            className="text-blue-600 hover:underline items-center"
          >
            Read More
          </button>
        </div>
      </div>
      {selectedComplaint && (
        <ReportDetailModal complaint={selectedComplaint} onClose={closeModal} />
      )}
    </div>
  );
};

export default AdminDashboard;
