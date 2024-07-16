import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { USER_ENDPOINTS } from "../../services/apiService";

const initialState = {
  project: {
    loading: false,
    error: null,
    projects: [],
  },
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjectsStart: (state, action) => {
        state.project.loading = true;
        state.project.error = null;
    },
    setProjects: (state, action) => {
        state.project.projects = action.payload;
        state.project.loading = false;
        state.project.error = null;
    },
    setError: (state, action) => {
        state.project.projects = [];
        state.project.loading = false;
        state.project.error = action.payload;
    }
    }
});

export const {setProjectsStart, setProjects, setError} = projectSlice.actions
export default projectSlice.reducer

export const fetchUserProjects = () => async(dispatch) => {
    dispatch(setProjectsStart());
    try {
        const response = await axios.post(USER_ENDPOINTS.FETCH_USER_PROJECTS, {}, {
            withCredentials: true,
        })
        dispatch(setProjects(response.data))
    } catch (error) {
        dispatch(setError(error.message || 'Failed to fetch user projects'));
    }
}