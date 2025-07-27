import {createSlice} from '@reduxjs/toolkit';
const initialState = {
    user: null,
    token: null,
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        updateUserSuccess: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
})
export const { loginSuccess, updateUserSuccess, logout } = authSlice.actions;
export default authSlice.reducer;