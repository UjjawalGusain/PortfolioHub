import { createSlice } from "@reduxjs/toolkit";
import { signup } from "./authThunks.js";

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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.auth.loading = true;
        state.auth.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.auth.loading = false;
        state.auth.isAuthenticated = true;
        state.auth.user = action.payload;
        state.auth.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.auth.loading = false;
        state.auth.isAuthenticated = false;
        state.auth.user = null;
        state.auth.error = action.payload;
      });
  },
});

export const { signupStart, signupSuccess, signupFailure } = authSlice.actions;
export default authSlice.reducer;
