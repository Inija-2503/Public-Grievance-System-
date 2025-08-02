import {createSlice} from '@reduxjs/toolkit';
const initialState = {
    user: null,
    token: null,
    isLoading: true,
   
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoading = false;
        },
        updateUserSuccess: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
        setAuthLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    },
})
export const { loginSuccess, updateUserSuccess, logout, setAuthLoading } = authSlice.actions;
export default authSlice.reducer;