import { API_BASE_URL } from "../config/apiConfig.js";

// USER ENDPOINTS
const USER_ENDPOINTS = {
  REGISTER: `${API_BASE_URL}/users/register`,
  LOGIN: `${API_BASE_URL}/users/login`,
  LOGOUT: `${API_BASE_URL}/users/logout`,
  REFRESH_TOKEN: `${API_BASE_URL}/users/refresh-token`,
  VERIFY_OTP: `${API_BASE_URL}/users/verify-otp`,
  FETCH_USER_DATA: `${API_BASE_URL}/users/fetch-user-data`,
  ADD_PROJECT: `${API_BASE_URL}/users/add-project`,
  FETCH_USER_PROJECTS: `${API_BASE_URL}/users/projects`,
};

export { USER_ENDPOINTS };
