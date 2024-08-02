import { createAsyncThunk } from "@reduxjs/toolkit";
import { USER_ENDPOINTS } from "../../services/apiService";
import axios from "axios";

export const fetchCertificates = createAsyncThunk(
  "fetchCertificates",
  async (username) => {
    try {
      const response = await axios.get(
        USER_ENDPOINTS.FETCH_CERTIFICATIONS.replace(":username", username)
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching certifications:", error);
    }
  }
);
