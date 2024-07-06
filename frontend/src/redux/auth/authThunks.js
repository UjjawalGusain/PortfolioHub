import {USER_ENDPOINTS} from "../../services/apiService.js"
import {createAsyncThunk} from "@reduxjs/toolkit"
import { signupAsync } from "../../services/apiService.js";
export const signup = createAsyncThunk(USER_ENDPOINTS.REGISTER, async (formData) => {
  try {
    const response = await signupAsync(formData); // Example API call
    return response.data; // Assuming response.data is the user object
  } catch (error) {
    throw new Error(error.response?.data?.message || "Signup failed");
  }
});
