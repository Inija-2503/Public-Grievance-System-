import React, { useEffect } from "react";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchReport } from "../../features/report/reportSlice";

const Report = () => {
  // const [complaints, setComplaints] = useState([]);
  // const [loading, setLoading] = useState(true); // New state for loading status
  // const [error, setError] = useState(null); // New state for error messages
  const dispatch = useDispatch();
  const {
    data: complaints,
    loading,
    error,
  } = useSelector((state) => state.report);

  // useEffect(() => {
  //   const fetchComplaints = async () => {
  //     setLoading(true); // Set loading to true when fetch starts
  //     setError(null); // Clear any previous errors

  //     const token = localStorage.getItem("token"); // Retrieve the JWT token from localStorage

  //     if (!token) {
  //       setError(
  //         "You are not logged in. Please sign in to view your complaints."
  //       );
  //       setLoading(false);
  //       // Optionally, redirect to login page here if not logged in
  //       // navigate('/login');
  //       return;
  //     }

  //     try {
  //       const res = await axios.get(
  //         "http://localhost:8080/api/complaints/report",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`, // Include the JWT in the Authorization header
  //           },
  //         }
  //       );
  //       setComplaints(res.data);
  //     } catch (err) {
  //       console.error("Error fetching complaints:", err);
  //       if (err.response) {
  //         // Server responded with a status other than 2xx
  //         if (err.response.status === 401 || err.response.status === 403) {
  //           setError(
  //             "Access denied. Please ensure you are logged in and authorized."
  //           );
  //         } else {
  //           setError(
  //             `Error: ${err.response.data.message || err.response.statusText}`
  //           );
  //         }
  //       } else if (err.request) {
  //         // No response received from server
  //         setError(
  //           "Network error: No response from the server. Please check your connection."
  //         );
  //       } else {
  //         // Something else happened in setting up the request
  //         setError("An unexpected error occurred while fetching complaints.");
  //       }
  //     } finally {
  //       setLoading(false); // Set loading to false once fetch is complete (success or error)
  //     }
  //   };

  //   fetchComplaints();
  // }, []); // Empty dependency array means this effect runs once on component mount

  useEffect(() => {
    dispatch(fetchReport());
  }, [dispatch]);

  const handleViewDetails = (filePath) => {
    if (filePath) {
      // Assuming your backend serves uploaded files from /uploads/
      window.open(`http://localhost:8080/uploads/${filePath}`, "_blank");
    } else {
      alert("No document uploaded for this complaint.");
    }
  };

  if (loading)
    return <div className="text-center p-4">Loading complaints...</div>;
  if (error)
    return <div className="text-center p-4 text-red-600">Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Complaint Report</h1>

      {/* {loading && (
        <div className="text-center p-4 text-gray-700">
          Loading complaints...
        </div>
      )} */}

      {/* {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )} */}

      {/* {!loading && !error && ( */}
      <div className="overflow-x-auto shadow rounded">
        <table className="min-w-full border border-gray-300 text-sm text-center">
          <thead className="bg-blue-100 text-gray-700 uppercase">
            <tr>
              <th className="p-2 border">Sl. No</th>
              <th className="p-2 border">Ticket Number</th>
              <th className="p-2 border">User Name</th>
              <th className="p-2 border">Complaint Date</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {complaints.length > 0 ? (
              complaints.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="p-2 border">{item.slNo}</td>
                  <td className="p-2 border">
                    {/* {item.id
                      ? `TICK-{item.id.toString().padStart(5, "0")}`
                      : "N/A"} */}
                    {item.ticketNumber || "N/A"}{" "}
                    {/* Assuming ticketNumber is a field in the item */}
                    {/* Pad with leading zeros */}
                  </td>
                  <td className="p-2 border">{item.complaintName}</td>
                  <td className="p-2 border">
                    {/* Format date. Check if createdAt exists and is valid */}
                    {item.complaintDate
                      ? new Date(item.complaintDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="p-2 border">{item.status || "Pending"}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleViewDetails(item.filePath)}
                      className="text-blue-600 hover:underline"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-gray-500">
                  No complaints found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* )} */}
    </div>
  );
};

export default Report;
