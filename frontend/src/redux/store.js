import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice.js";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
