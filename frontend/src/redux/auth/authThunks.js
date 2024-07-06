import {createAsyncThunk} from "@reduxjs/toolkit"
import { USER_ENDPOINTS } from "../../services/apiService.js";
import axios from "axios";

export const signup = createAsyncThunk(
  USER_ENDPOINTS.REGISTER,
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(USER_ENDPOINTS.REGISTER, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);