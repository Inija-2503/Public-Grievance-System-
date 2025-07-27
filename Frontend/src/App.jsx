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
function App() {
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
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDasboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/department-dashboard"
            element={
              <ProtectedRoute allowedRoles={["department"]}>
                <DepartmentDasboard />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/my-profile"
            element={
              <ProtectedRoute allowedRoles={["admin", "department", "USER"]}>
                <MyProfile />
              </ProtectedRoute>
            }
          /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
