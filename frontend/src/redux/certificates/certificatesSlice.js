import { createSlice } from "@reduxjs/toolkit";
import { fetchCertificates } from "./certificatesThunks";

const initialState = {
    certificates: null,
    isError: false,
    isLoading: false,
};

const certificatesSlice = createSlice({
  name: "certificates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCertificates.pending, (state, action) => {
        state.isLoading = true;
    });

    builder.addCase(fetchCertificates.fulfilled, (state, action) => {
        state.certificates = action.payload;
        state.isLoading = false;
    })

    builder.addCase(fetchCertificates.rejected, (state, action) => {
        console.error("Error while fetching certificates: ", action.payload);
        state.isLoading = false;
        this.state.isError = true;
    })
  }
});

export default certificatesSlice.reducer

