import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  assignComplaint,
  rejectComplaint,
} from "../features/adminreport/adminComplaintsSlice";
import Modal from "./Modal";

const ReportDetailModal = ({ complaint, onClose }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const [showDepartmentSelect, setShowDepartmentSelect] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [selectedDeptId, setSelectedDeptId] = useState("");

  useEffect(() => {
    if (showDepartmentSelect && token) {
      axios
        .get("http://localhost:8080/api/admin/departments", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          // Ensure the response is an array before setting it
          if (Array.isArray(res.data)) {
            setDepartments(res.data);
          }
        })
        .catch((err) => console.error("Failed to fetch departments", err));
    }
  }, [showDepartmentSelect, token]);

  const handleReject = () => {
    if (window.confirm("Are you sure you want to reject this complaint?")) {
      dispatch(rejectComplaint(complaint.id));
      onClose();
    }
  };

  const handleForward = () => {
    if (!showDepartmentSelect) {
      setShowDepartmentSelect(true);
      return;
    }
    if (selectedDeptId) {
      dispatch(
        assignComplaint({
          complaintId: complaint.id,
          departmentId: selectedDeptId,
        })
      );
      onClose();
    } else {
      alert("Please select a department to forward to.");
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Complaint Details</h2>

      <div className="space-y-2 text-sm">
        <p>
          <strong>Ticket Number:</strong> {complaint.name}
        </p>
        <p>
          <strong>User Name:</strong> {complaint.ticketNumber}
        </p>

        {/* {complaint.district && ( */}
        <p>
          <strong>District:</strong> {complaint.districtId}
        </p>
        {/* )} */}
        {/* {complaint.taluk && ( */}
        <p>
          <strong>Taluk:</strong> {complaint.talukId}
        </p>
        {/* )} */}
        {/* {complaint.filePath && ( */}
        <p>
          <strong>File:</strong> {complaint.filePath}
        </p>
        {/* )} */}
        {complaint.remarks && (
          <p>
            <strong>Remarks:</strong> {complaint.remarks}
          </p>
        )}
      </div>

      {showDepartmentSelect && (
        <div className="my-4">
          <label className="block font-bold mb-2">Forward to Department:</label>
          <select
            value={selectedDeptId}
            onChange={(e) => setSelectedDeptId(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">-- Select a Department --</option>

            {Array.isArray(departments) &&
              departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
          </select>
        </div>
      )}

      <div className="flex justify-end gap-4 mt-6 ">
        <button
          onClick={onClose}
          className="bg-gray-300 px-4 py-2 rounded cursor-pointer"
        >
          Close
        </button>
        {!showDepartmentSelect && (
          <button
            onClick={handleReject}
            className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
          >
            Reject
          </button>
        )}
        <button
          onClick={handleForward}
          className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          {showDepartmentSelect ? "Confirm & Forward" : "Forward"}
        </button>
      </div>
    </Modal>
  );
};

export default ReportDetailModal;
