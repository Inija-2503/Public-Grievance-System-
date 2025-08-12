import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getToken = (getState) => getState().auth.token;

// --- ASYNC THUNKS (API Calls) ---

/**
 * Fetches the list of complaints assigned to a specific department.
 */
export const fetchDepartmentComplaints = createAsyncThunk(
  "department/fetchComplaints",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState);
    //   const departmentId = getState().auth.user.departmentId; // <-- fetch from auth
      const response = await axios.get(
        `http://localhost:8080/api/department/assigned-complaints`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch assigned complaints."
      );
    }
  }
);

/**
 * Updates the status of a complaint to RESOLVED or REJECTED.
 */
export const updateComplaintStatus = createAsyncThunk(
  "department/updateStatus",
  async ({ complaintId, status, photoUrl }, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState);

      let url = "";
      let config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      if (status === "RESOLVED") {
        url = `http://localhost:8080/api/department/resolve/${complaintId}?photoUrl=${encodeURIComponent(
          photoUrl || ""
        )}`;
      } else if (status === "REJECTED") {
        url = `http://localhost:8080/api/department/reject/${complaintId}`;
      } else {
        return rejectWithValue("Invalid status");
      }

      const response = await axios.put(url, {}, config);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update status."
      );
    }
  }
);

/**
 * Uploads a document for a specific complaint.
 */
export const uploadDepartmentDocument = createAsyncThunk(
  "department/uploadDocument",
  async ({ complaintId, file }, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState);
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `http://localhost:8080/api/department/complaints/${complaintId}/document`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to upload document."
      );
    }
  }
);

// --- REDUX SLICE ---
const departmentSlice = createSlice({
  name: "department",
  initialState: {
    complaints: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch complaints
      .addCase(fetchDepartmentComplaints.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDepartmentComplaints.fulfilled, (state, action) => {
        state.loading = false;
        state.complaints = action.payload;
      })
      .addCase(fetchDepartmentComplaints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update complaint after status change
      .addCase(updateComplaintStatus.fulfilled, (state, action) => {
        const index = state.complaints.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) {
          state.complaints[index] = action.payload;
        }
      })

      // Update complaint after document upload
      .addCase(uploadDepartmentDocument.fulfilled, (state, action) => {
        const index = state.complaints.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) {
          state.complaints[index] = action.payload;
        }
      });
  },
});

export default departmentSlice.reducer;
