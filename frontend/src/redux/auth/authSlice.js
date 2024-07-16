import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { USER_ENDPOINTS } from "../../services/apiService";
const initialState = {
  auth: {
    loading: false,
    error: null,
    isAuthenticated: false,
    user: null,
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signupStart: (state) => {
      state.auth.loading = true;
      state.auth.error = null;
    },
    signupSuccess: (state, action) => {
      state.auth.loading = false;
      state.auth.isAuthenticated = true;
      state.auth.user = action.payload;
      state.auth.error = null;
    },
    signupFailure: (state, action) => { 
      state.auth.loading = false;
      state.auth.isAuthenticated = false;
      state.auth.user = null;
      state.auth.error = action.payload;
    },
    clearPassword: (state) => {
      if (state.auth && state.auth.user.data && state.auth.user.data.password) {
        delete state.auth.user.data.password;
      }
    },
    setUser: (state, action) => {
      state.auth.loading = false;
      state.auth.isAuthenticated = true;
      state.auth.user = action.payload;
      state.auth.error = null;
    },
    setError: (state, action) => {
      state.auth.loading = false;
      state.auth.isAuthenticated = false;
      state.auth.user = null;
      state.auth.error = action.payload;
    },
  },
});

export const { signupStart, signupSuccess, signupFailure, clearPassword, setError, setUser } = authSlice.actions;
export default authSlice.reducer;

export const fetchUserData = () => async (dispatch) => {
  try {
    dispatch(setUser(null)); // Clear previous user data if any
    const response = await axios.post(USER_ENDPOINTS.FETCH_USER_DATA, {}, {
      withCredentials: true,
    });
    // console.log("RES: ", response.data.data)
    // console.log(1);

    dispatch(setUser(response.data)); // Set new user data
  } catch (error) {
    dispatch(setError(error.message || 'Failed to fetch user data'));
  }
};