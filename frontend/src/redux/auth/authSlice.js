import { createSlice } from "@reduxjs/toolkit";
import { fetchUserData, login, logout } from "./authThunks.js";

const initialState = {
  user: null,
  isLoading: false,
  isError: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });

    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.isLoading = false
      console.log("Error: ", action.payload);
      state.isError = true;
    });

    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });

    builder.addCase(login.rejected, (state, action) => {
      console.log("Error: ", action.payload);
      state.isError = true;
    });

    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = null;
    });

    builder.addCase(logout.rejected, (state, action) => {
      console.log("Error: ", action.payload);
      state.isError = true;
    });
  }
});


export default authSlice.reducer;



