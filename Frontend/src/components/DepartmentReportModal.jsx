import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateComplaintStatus,
  uploadDepartmentDocument,
} from "../features/department/departmentComplaintsSlice"; // Correct the path if needed
import Modal from "./Modal";

const DepartmentDetailModal = ({ complaint, onClose }) => {
  console.log("Complaint object in modal:", complaint);
  const dispatch = useDispatch();

  // Local state for the form elements within the modal
  const [selectedStatus, setSelectedStatus] = useState(complaint.status || "");
  const [selectedFile, setSelectedFile] = useState(null);

  // Handler for when the file input changes
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handler for the main "Update" button
  const handleUpdate = () => {
    //  Update the status if it has been changed
    if (selectedStatus && selectedStatus !== complaint.status) {
      dispatch(
        updateComplaintStatus({
          complaintId: complaint.complaintId,
          status: selectedStatus,
        })
      );
    }

    //  Upload a document if a file has been selected
    if (selectedFile) {
      dispatch(
        uploadDepartmentDocument({
          complaintId: complaint.complaintId,
          file: selectedFile,
        })
      );
    }

    //  Close the modal
    onClose();
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Complaint Details</h2>

      {/* Display Complaint Info */}
      <div className="space-y-2 text-sm border-b pb-4 mb-4">
        <p>
          <strong>Ticket Number:</strong> {complaint.ticketNumber}
        </p>
        {/* <p>
          <strong>User Name:</strong> {complaint.complaintName}
        </p> */}
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
        <p>
          <strong>Complaint:</strong>{" "}
          {complaint.remarks || "No complaint provided."}
        </p>
        <p>
          <strong>Current Status:</strong> {complaint.status}
        </p>
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

      {/* Department Actions Form */}
      <div className="space-y-4">
        <div>
          <label className="block font-bold mb-2">Update Status:</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="ASSIGNED">Assigned</option>
            <option value="RESOLVED">Resolved</option>
            <option value="REJECTED">Rejected</option>
            {/* <option value="ADMIN_VERIFY">Needs Admin Verification</option> */}
          </select>
        </div>

        <div>
          <label className="block font-bold mb-2">
            Upload Resolution Document:
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
          Cancel
        </button>
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update Complaint
        </button>
      </div>
    </Modal>
  );
};

export default DepartmentDetailModal;
