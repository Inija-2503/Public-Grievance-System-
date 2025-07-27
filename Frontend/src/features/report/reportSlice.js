import {createSlice,createAsyncThunk}   from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchReport = createAsyncThunk(
  'report/fetch',
  async(_,{ getState, rejectWithValue }) => {
    try {
      const {token} = getState().auth;

      const response = await axios.get(
        'http://localhost:8080/api/complaints/report',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch report.');
    }
  }
)
const reportSlice = createSlice({
  name: 'report',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReport.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReport.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reportSlice.reducer;