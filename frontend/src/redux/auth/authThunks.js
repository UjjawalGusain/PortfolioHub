import { USER_ENDPOINTS } from "../../services/apiService.js";
import axios from "axios";
import { signupStart, signupSuccess, signupFailure } from "./authSlice.js";

export const signup = (userData) => async (dispatch) => {
  try {
    dispatch(signupStart());
    const response = await axios.post(USER_ENDPOINTS.REGISTER, userData);
    dispatch(signupSuccess(response.data));
  } catch (error) {
    if (error.response) {
      dispatch(signupFailure(error.response.data.message));
    } else {
      dispatch(signupFailure(error.message));
    }
  }
};

