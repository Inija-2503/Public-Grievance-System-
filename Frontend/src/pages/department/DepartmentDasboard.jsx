import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchDashboardStats } from "../../features/department/departmentDashboardSlice";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import DepartmentDetailModal from "../../components/DepartmentReportModal"; // Assuming this is your modal

ChartJS.register(ArcElement, Tooltip, Legend);

const DepartmentDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { stats, recentComplaints, loading, error } = useSelector(
    (state) => state.departmentDashboard
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

  if (loading || !stats) {
    return (
      <div className="p-6 text-center">Loading Department Dashboard...</div>
    );
  }

  const chartData = {
    labels: ["Pending", "Resolved", "Rejected"],
    datasets: [
      {
        label: "Assigned Complaints",
        data: [
          stats.pendingComplaints || 0,
          stats.resolvedComplaints || 0,
          stats.rejectedComplaints || 0,
        ],
        backgroundColor: [
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(255, 99, 132, 0.7)",
        ],
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };

  if (error) {
    return <div className="p-6 text-center text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Department Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-100 p-4 rounded shadow">
          <h2 className="font-bold text-blue-800">Total Assigned</h2>

          <p className="text-3xl">{stats.totalAssigned || 0}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow">
          <h2 className="font-bold text-yellow-800">Pending</h2>
          <p className="text-3xl">{stats.pendingComplaints || 0}</p>
        </div>
        {/* ... other stat cards are fine ... */}
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
            <h2 className="text-xl font-bold">Recently Assigned Complaints</h2>

            <button
              onClick={() => navigate("/department/complaints")}
              className="text-blue-600 hover:underline"
            >
              View All
            </button>
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
                {/* Safety check for recentComplaints */}
                {Array.isArray(recentComplaints) &&
                  recentComplaints.map((c) => (
                    <tr key={c.ticketNumber} className="border-b">
                      <td className="p-2">{c.ticketNumber}</td>

                      <td className="p-2">{c.complaintName}</td>
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
        </div>
      </div>

      {selectedComplaint && (
        <DepartmentDetailModal
          complaint={selectedComplaint}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default DepartmentDashboard;
