import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
  error: null,
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signupStart: (state) => {
      state.loading = true; 
      state.error = null; 
    },
    signupSuccess: (state, action) => {
      state.loading = false; 
      state.isAuthenticated = true;
      state.user = action.payload; 
      state.error = null;
    },
    signupFailure: (state, action) => {
      state.loading = false; 
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
  },
});
 
export const { signupStart, signupSuccess, signupFailure } = authSlice.actions;
export default authSlice.reducer;
