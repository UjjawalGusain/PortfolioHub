import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice.js";
import projectsReducer from "./project/projectsSlice.js"
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  auth: authReducer,
  projects: projectsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
 