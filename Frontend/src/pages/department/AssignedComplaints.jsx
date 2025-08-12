import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartmentComplaints } from "../../features/department/departmentComplaintsSlice";
import DepartmentDetailModal from "../../components/DepartmentReportModal";

const AssignedComplaints = () => {
  const dispatch = useDispatch();
  const { complaints, loading, error } = useSelector(
    (state) => state.department
  );

  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    dispatch(fetchDepartmentComplaints());
  }, [dispatch]);

  // Memoized logic to filter and sort the complaints without re-calculating on every render
  const filteredAndSortedComplaints = useMemo(() => {
    let result = Array.isArray(complaints) ? [...complaints] : [];

    // Apply the status filter
    if (statusFilter !== "ALL") {
      result = result.filter((c) => c.status === statusFilter);
    }

    // Apply sorting
    if (sortBy === "newest") {
      result.sort(
        (a, b) => new Date(b.complaintDate) - new Date(a.complaintDate)
      );
    } else if (sortBy === "oldest") {
      result.sort(
        (a, b) => new Date(a.complaintDate) - new Date(b.complaintDate)
      );
    }

    return result;
  }, [complaints, statusFilter, sortBy]);

  const handleViewDetails = (complaint) => {
    setSelectedComplaint(complaint);
  };

  const closeModal = () => {
    setSelectedComplaint(null);
  };

  if (loading) {
    return (
      <div className="p-6 text-center">Loading assigned complaints...</div>
    );
  }

  if (error) {
    return <div className="p-6 text-center text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Assigned Complaints</h1>

      {/* Filter and Sort Controls */}
      <div className="flex flex-wrap gap-4 items-center mb-4 p-4 bg-gray-50 rounded-lg">
        <div>
          <label
            htmlFor="statusFilter"
            className="block text-sm font-medium text-gray-700"
          >
            Filter by Status
          </label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 rounded-md"
          >
            <option value="ALL">All Statuses</option>
            <option value="ASSIGNED">Assigned</option>
            <option value="RESOLVED">Resolved</option>
            <option value="REJECTED">Rejected</option>
            <option value="ADMIN_VERIFY">Admin Verify</option>
          </select>
        </div>
        <div className="ml-6">
          <label className="block text-sm font-medium text-gray-700">
            Sort by Date
          </label>
          <div className="flex items-center gap-4 mt-1">
            <label className="flex items-center">
              <input
                type="radio"
                value="newest"
                checked={sortBy === "newest"}
                onChange={(e) => setSortBy(e.target.value)}
                className="mr-1"
              />
              Newest First
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="oldest"
                checked={sortBy === "oldest"}
                onChange={(e) => setSortBy(e.target.value)}
                className="mr-1"
              />
              Oldest First
            </label>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto shadow rounded">
        <table className="min-w-full border text-sm text-center">
          <thead className="bg-blue-100 uppercase">
            <tr>
              <th className="p-2 border">Ticket Number</th>
              <th className="p-2 border">User Name</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedComplaints.length > 0 ? (
              filteredAndSortedComplaints.map((complaint) => (
                <tr key={complaint.id}>
                  <td className="p-2 border">{complaint.ticketNumber}</td>
                  <td className="p-2 border">{complaint.complaintName}</td>
                  <td className="p-2 border">
                    {new Date(complaint.complaintDate).toLocaleDateString()}
                  </td>
                  <td className="p-2 border">{complaint.status}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleViewDetails(complaint)}
                      className="text-blue-600 hover:underline"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-gray-500">
                  No complaints found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
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

export default AssignedComplaints;
