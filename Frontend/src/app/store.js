import {configureStore} from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice"
import complaintReducer from "../features/complaint/complaintSlice";
import reportReducer from "../features/report/reportSlice";
import usersReducer from "../features/admin/userSlice";
import departmentReducer from "../features/admin/departmentSlice";
import adminComplaintsReducer from "../features/admin/adminComplaintsSlice";
import dashboardReducer from '../features/admin/dashboardSlice'
import departmentCompliaintsReducer from '../features/department/departmentComplaintsSlice'
import departmentDashboardReducer from '../features/department/departmentDashboardSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        complaint: complaintReducer,
        report:reportReducer,
        users:usersReducer,
        departments:departmentReducer,
        adminComplaints:adminComplaintsReducer,
        dashboard:dashboardReducer,
        department:departmentCompliaintsReducer,
        departmentDashboard: departmentDashboardReducer
    },
});