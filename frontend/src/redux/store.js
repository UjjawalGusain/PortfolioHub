import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice.js";
import profileReducer from "./profile/profileSlice.js"
import githubReducer from "./github/githubSlice.js"
import projectsReducer from "./projects/projectsSlice.js"
import certificatesReducer from "./certificates/certificatesSlice.js" 
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  projects: projectsReducer,
  github: githubReducer,
  certificates: certificatesReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
 