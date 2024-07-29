import { createSlice } from "@reduxjs/toolkit";
import { fetchGithub } from "./githubThunks";

const initialState = {
    githubData: null,
    isLoading: false,
    isError: false
}

const githubSlice = createSlice({
    name: "github",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchGithub.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(fetchGithub.fulfilled, (state, action) => {
            state.githubData = action.payload;
            state.isLoading = false;
        });

        builder.addCase(fetchGithub.rejected, (state, action) => {
            console.error("Error while fetching github data: ", action.payload);
            state.isError = true;
            state.isLoading = false;
        });
    }
})

export default githubSlice.reducer