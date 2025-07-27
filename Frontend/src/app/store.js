import {configureStore} from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice"
import complaintReducer from "../features/complaints/complaintSlice";
import reportReducer from "../features/report/reportSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        complaint: complaintReducer,
        report:reportReducer
    },
});