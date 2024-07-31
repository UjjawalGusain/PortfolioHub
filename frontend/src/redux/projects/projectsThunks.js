import { createAsyncThunk } from "@reduxjs/toolkit";
import { USER_ENDPOINTS } from "../../services/apiService";
import axios from "axios";

export const fetchProjects = createAsyncThunk("fetchProjects", async (username) => {
    try {
        const response = await axios.get(
          USER_ENDPOINTS.FETCH_USER_PROJECTS.replace(":username", username)
        );
        return response.data.data.projectObjects
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
})