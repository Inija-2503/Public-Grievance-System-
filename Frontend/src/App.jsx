import { Routes, Route } from "react-router-dom";
import Home from "./pages/user/Home";
import Login from "./pages/user/Login";
import Complaint from "./pages/user/Complaint";
import Report from "./pages/user/Report";
import MyProfile from "./pages/user/MyProfile";
import Dashboard from "./pages/user/Dashboard";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminDasboard from "./pages/admin/AdminDasboard";
import DepartmentDasboard from "./pages/department/DepartmentDasboard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { loginSuccess, setAuthLoading } from "./features/auth/authSlice";
import ManageDepartments from "./pages/admin/ManageDepartments";
import ManageUsers from "./pages/admin/ManageUsers";
import AllReports from "./pages/admin/AllReports";
import AssignedComplaints from "./pages/department/AssignedComplaints";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const userPayload = jwtDecode(token);
        dispatch(loginSuccess({ user: userPayload, token }));
      } catch (err) {
        console.log(err);
        localStorage.removeItem("token");
      }
    }
    dispatch(setAuthLoading(false));
  }, [dispatch]);
  return (
    <>
      <div className="mx-4 sm:mx-[10%]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/complaint" element={<Complaint />} />
          <Route
            path="/report"
            element={
              <ProtectedRoute allowedRoles={["USER"]}>
                <Report />
              </ProtectedRoute>
            }
          />
          {/* <Route path="/my-profile" element={<MyProfile />} /> */}
          <Route path="*" element={<NotFound />} />
          <Route
            path="/admin/Dashboard"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminDasboard />
              </ProtectedRoute>
            }
          />
          {/* <Route path="department/Dashboard" element={<DepartmentDasboard />} /> */}
          <Route
            path="department/Dashboard"
            element={
              <ProtectedRoute allowedRoles={["DEPARTMENT"]}>
                <DepartmentDasboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-profile"
            element={
              <ProtectedRoute allowedRoles={["ADMIN", "DEPARTMENT", "USER"]}>
                <MyProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/Departments"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <ManageDepartments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/Users"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <ManageUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/Reports"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AllReports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/department/Complaints"
            element={
              <ProtectedRoute allowedRoles={["DEPARTMENT"]}>
                <AssignedComplaints />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
