import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Helper to get the token from the Redux state
const getToken = (getState) => getState().auth.token;

// --- ASYNC THUNKS ---

// Fetches all complaints for the admin dashboard
export const fetchAllComplaints = createAsyncThunk(
  'adminComplaints/fetchAll',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState);
      const response = await axios.get('http://localhost:8080/api/admin/reports', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch complaints.');
    }
  }
);

// Rejects a complaint by updating its status
export const rejectComplaint = createAsyncThunk(
  'adminComplaints/reject',
  async (complaintId, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState);
      const response = await axios.put(`http://localhost:8080/api/admin/complaints/${complaintId}/status?status=REJECTED`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data; // Return the updated complaint object
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to reject complaint.');
    }
  }
);

// Assigns (forwards) a complaint to a department
export const assignComplaint = createAsyncThunk(
  'adminComplaints/assign',
  async ({ complaintId, departmentId }, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState);
      const response = await axios.put(`http://localhost:8080/api/admin/complaints/${complaintId}/assign-department`, { departmentId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data; // Return the updated complaint object
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to assign complaint.');
    }
  }
);

// --- THE SLICE ---
const adminComplaintsSlice = createSlice({
  name: 'adminComplaints',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Reducers for fetching all complaints
      .addCase(fetchAllComplaints.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllComplaints.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllComplaints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Reducers to update the list after an action
      .addCase(rejectComplaint.fulfilled, (state, action) => {
        const index = state.data.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload; // Update the specific complaint in the list
        }
      })
      .addCase(assignComplaint.fulfilled, (state, action) => {
        const index = state.data.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload; // Update the specific complaint in the list
        }
      });
  },
});

export default adminComplaintsSlice.reducer;