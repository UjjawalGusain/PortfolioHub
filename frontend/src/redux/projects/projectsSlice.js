import { createSlice } from "@reduxjs/toolkit";
import { fetchProjects } from "./projectsThunks";

const initialState = {
    projects: null,
    isError: false,
    isLoading: false,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.pending, (state, action) => {
        state.isLoading = true;
    });

    builder.addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
        state.isLoading = false;
    })

    builder.addCase(fetchProjects.rejected, (state, action) => {
        console.error("Error while fetching projects: ", action.payload);
        state.isLoading = false;
        this.state.isError = true;
    })
  }
});

export default projectsSlice.reducer

