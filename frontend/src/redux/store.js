import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice.js";
import profileReducer from "./profile/profileSlice.js"
import projectsReducer from "./project/projectsSlice.js"
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  projects: projectsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
 