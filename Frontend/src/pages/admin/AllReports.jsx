import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllComplaints } from "../../features/admin/adminComplaintsSlice";
import ReportDetailModal from "../../components/ReportDetailModal"; // The modal you created

const AllReports = () => {
  const dispatch = useDispatch();
  const {
    data: complaints,
    loading,
    error,
  } = useSelector((state) => state.adminComplaints);

  // State to manage which complaint is selected to be shown in the modal
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  useEffect(() => {
    dispatch(fetchAllComplaints());
  }, [dispatch]);

  const handleViewDetails = (complaint) => {
    console.log(complaint);
    setSelectedComplaint(complaint);
  };

  const closeModal = () => {
    setSelectedComplaint(null);
  };

  if (loading)
    return <div className="p-6 text-center">Loading all complaints...</div>;
  if (error)
    return <div className="p-6 text-center text-red-600">Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Complaints</h1>
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
            {complaints && complaints.length > 0 ? (
              complaints?.map((complaint) => (
                <tr key={complaint.id}>
                  <td className="p-2 border">{complaint.name}</td>
                  <td className="p-2 border">{complaint.ticketNumber}</td>
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
                  No complaints found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* The Modal for viewing details will only render when a complaint is selected */}
      {selectedComplaint && (
        <ReportDetailModal complaint={selectedComplaint} onClose={closeModal} />
      )}
    </div>
  );
};

export default AllReports;
