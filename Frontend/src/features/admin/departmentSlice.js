import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Helper function to get the token from the state
const getToken = (getState) => getState().auth.token;

// THUNK for fetching all departments
export const fetchDepartments = createAsyncThunk(
  'departments/fetchAll',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState);
      const response = await axios.get('http://localhost:8080/api/admin/departments', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch departments.');
    }
  }
);

// THUNK for adding a new department
export const addDepartment = createAsyncThunk(
  'departments/add',
  async (departmentData, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState);
      const response = await axios.post('http://localhost:8080/api/admin/departments', departmentData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to add department.');
    }
  }
);

// THUNK for updating a department
export const updateDepartment = createAsyncThunk(
  'departments/update',
  async ({ id, departmentData }, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState);
      const response = await axios.put(`http://localhost:8080/api/admin/departments/${id}`, departmentData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update department.');
    }
  }
);

// THUNK for deleting a department
export const deleteDepartment = createAsyncThunk(
  'departments/delete',
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState);
      await axios.delete(`http://localhost:8080/api/admin/departments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id; // Return the ID of the deleted department
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete department.');
    }
  }
);

const departmentSlice = createSlice({
  name: 'departments',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Departments
      .addCase(fetchDepartments.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchDepartments.fulfilled, (state, action) => { state.loading = false; state.data = action.payload; })
      .addCase(fetchDepartments.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      
      // Add Department
      .addCase(addDepartment.fulfilled, (state, action) => {
        state.data.push(action.payload); // Add the new department to the list
      })
      
      // Update Department
      .addCase(updateDepartment.fulfilled, (state, action) => {
        const index = state.data.findIndex(dep => dep.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload; // Update the department in the list
        }
      })

      // Delete Department
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.data = state.data.filter(dep => dep.id !== action.payload); // Remove the department from the list
      });
  },
});

export default departmentSlice.reducer;