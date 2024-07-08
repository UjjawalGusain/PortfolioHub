import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: {
    loading: false,
    error: null,
    isAuthenticated: false,
    user: null,
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signupStart: (state) => {
      state.auth.loading = true;
      state.auth.error = null;
    },
    signupSuccess: (state, action) => {
      state.auth.loading = false;
      state.auth.isAuthenticated = true;
      state.auth.user = action.payload;
      state.auth.error = null;
    },
    signupFailure: (state, action) => {
      state.auth.loading = false;
      state.auth.isAuthenticated = false;
      state.auth.user = null;
      state.auth.error = action.payload;
    },
    clearPassword: (state) => {
      if (state.auth.user && state.auth.user.data && state.auth.user.data.password) {
        delete state.auth.user.data.password;
      }
    },
  },
});

export const { signupStart, signupSuccess, signupFailure, clearPassword } = authSlice.actions;
export default authSlice.reducer;
