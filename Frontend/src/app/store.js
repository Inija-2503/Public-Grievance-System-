import {configureStore} from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice"
import complaintReducer from "../features/complaints/complaintSlice";
import reportReducer from "../features/report/reportSlice";
import usersReducer from "../features/users/userSlice";
import departmentReducer from "../features/department/departmentSlice";
import adminComplaintsReducer from "../features/adminreport/adminComplaintsSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        complaint: complaintReducer,
        report:reportReducer,
        users:usersReducer,
        departments:departmentReducer,
        adminComplaints:adminComplaintsReducer
    },
});