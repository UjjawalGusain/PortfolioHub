import { createSlice } from "@reduxjs/toolkit";
import { fetchProfileData } from "./profileThunks";

const initialState = {
  profile: null,
  isLoading: false,
  isError: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProfileData.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchProfileData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.profile = action.payload;
    });

    builder.addCase(fetchProfileData.rejected, (state, action) => {
      console.log("Error: ", action.payload);
      state.isLoading = false
      state.isError = true;
    });
  },
});

export default profileSlice.reducer;
