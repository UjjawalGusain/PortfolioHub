import { createAsyncThunk } from "@reduxjs/toolkit";
import { PROFILE_ENDPOINTS } from "../../services/apiService";
import axios from "axios";

export const fetchProfileData = createAsyncThunk(
  "fetchProfileData",
  async (username) => {
    try {
        // console.log("Username 2: ", username);
      const response = await axios.get(
        PROFILE_ENDPOINTS.FETCH_USER_PROFILE.replace(":username", username)
      );
    //   console.log("Response in thunks: ", response);
      return response.data.data
    } catch (err) {
        console.error("Error fetching profile data:", error);
    }
  }
);
