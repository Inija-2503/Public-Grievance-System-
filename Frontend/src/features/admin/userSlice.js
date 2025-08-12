import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk(
  'users/fetchDetails',
  async(_,{ getState, rejectWithValue }) => {
    try{
        const {auth} = getState();
        const token = auth.token
        const response = await axios.get(
            'http://localhost:8080/api/admin/users',{
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            }
        )
        return response.data
    }
    catch(error){
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch user details.');
    }
  }
)
const userSlice = createSlice({
    name:"user",
    initialState:{
        data:[],
        loading:false,
        error:null,
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchUsers.pending,(state)=>{
            state.loading = true;
            state.error = null; 
        })
        .addCase(fetchUsers.fulfilled,(state,action)=>{
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        })
        .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      });
    }
})
export default userSlice.reducer;