import { USER_ENDPOINTS } from "../../services/apiService.js";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserData = createAsyncThunk("fetchUserData", async () => {
  try {
    const response = await axios.post( 
      USER_ENDPOINTS.FETCH_USER_DATA,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
});

export const login = createAsyncThunk("login", async (data) => {
  try {
    const res = await axios.post(USER_ENDPOINTS.LOGIN, data, {
      withCredentials: true,
    });

    return res.data.data.user;
  } catch (error) {
    console.error("Error during login:", error);
  }
});

export const logout = createAsyncThunk("logout", async () => {
  try {
    const res = await axios.post(
      USER_ENDPOINTS.LOGOUT,
      {},
      {
        withCredentials: true,
      }
    );

  } catch (error) {
    console.error("Error during logout:", error);
  }
});
