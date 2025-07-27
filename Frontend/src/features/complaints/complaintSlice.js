import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const submitComplaint = createAsyncThunk(
  'complaints/submit',
  async (complaintData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth.token;

      const response = await axios.post(
        'http://localhost:8080/api/complaints', 
        complaintData,
        {
          headers: {
            // "content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to submit complaint.');
    }
  }
);

const complaintSlice = createSlice({
  name: 'complaints',
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetComplaintState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitComplaint.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitComplaint.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitComplaint.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetComplaintState } = complaintSlice.actions;
export default complaintSlice.reducer;