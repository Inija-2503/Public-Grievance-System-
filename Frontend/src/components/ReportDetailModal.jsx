import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  assignComplaint,
  // rejectComplaint,
} from "../features/admin/adminComplaintsSlice";
import Modal from "./Modal";

const ReportDetailModal = ({ complaint, onClose }) => {
  // console.log("Complaint object in modal:", complaint);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  // console.log(token);

  const [showDepartmentSelect, setShowDepartmentSelect] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [selectedDeptId, setSelectedDeptId] = useState("");

  useEffect(() => {
    if (showDepartmentSelect && token) {
      axios
        .get("http://localhost:8080/api/admin/departments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
    // if (window.confirm("Are you sure you want to reject this complaint?")) {
    //   dispatch(rejectComplaint(complaint.id));
    //   onClose();
    // }
    // const token = getToken(getState);
    axios
      .put(
        `http://localhost:8080/api/admin/complaints/${complaint.complaintId}/status?status=REJECT`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleForward = () => {
    if (!showDepartmentSelect) {
      setShowDepartmentSelect(true);
      return;
    }
    if (selectedDeptId) {
      dispatch(
        assignComplaint({
          complaintId: complaint.complaintId,
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
          <strong>Ticket Number:</strong> {complaint.ticketNumber}
        </p>
        <p>
          <strong>User Name:</strong> {complaint.name}
        </p>

        {complaint.district && (
          <p>
            <strong>District:</strong> {complaint.district}
          </p>
        )}
        {complaint.taluk && (
          <p>
            <strong>Taluk:</strong> {complaint.taluk}
          </p>
        )}
        {/* {complaint.filePath && (
          <p>
            <strong>File:</strong> {complaint.filePath}
          </p>
        )} */}
        {complaint.remarks && (
          <p>
            <strong>Complaint:</strong> {complaint.remarks}
          </p>
        )}
        {complaint.filePath ? (
          <p>
            <strong>User Document:</strong>{" "}
            <a
              href={`http://localhost:8080/${complaint.filePath}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              View Document
            </a>
          </p>
        ) : (
          <p>
            <strong>User Document:</strong>{" "}
            <button
              onClick={() => alert("No documents uploaded yet.")}
              className="text-red-500 hover:underline"
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
              }}
            >
              View Document
            </button>
          </p>
        )}

        {complaint.deptSolutionFilePath ? (
          <p>
            <strong>Department Document:</strong>{" "}
            <a
              href={`http://localhost:8080/${complaint.deptSolutionFilePath}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              View Document
            </a>
          </p>
        ) : (
          <p>
            <strong>Department Document:</strong>{" "}
            <button
              onClick={() => alert("No documents uploaded yet.")}
              className="text-red-500 hover:underline"
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
              }}
            >
              View Document
            </button>
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
