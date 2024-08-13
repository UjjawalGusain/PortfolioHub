// USER ENDPOINTS
const USER_ENDPOINTS = {
  REGISTER: `/api/v1/users/register`,
  LOGIN: `https://portfolio-hub-backend.vercel.app/api/v1/users/login`,
  LOGOUT: `/api/v1/users/logout`,
  REFRESH_TOKEN: `/api/v1/users/refresh-token`,
  VERIFY_OTP: `/api/v1/users/verify-otp`,
  FETCH_USER_DATA: `/api/v1/users/fetch-user-data`,
  ADD_PROJECT: `/api/v1/users/add-project`, // post
  FETCH_USER_PROJECTS: `/api/v1/users/:username/projects`, // get
  FETCH_PROJECT: `/api/v1/users/:username/projects/:projectName`, //get
  SEND_EMAIL: `/api/v1/users/:username/contact`, //get
  DELETE_PROJECT: `/api/v1/users/:username/projects/deleteProject`,
  ADD_CERTIFICATION: `/api/v1/users/:username/certifications/add-certificate`, //post
  FETCH_CERTIFICATIONS: `/api/v1/users/:username/certifications`, //get
  DELETE_CERTIFICATION: `/api/v1/users/:username/certifications/delete-certification`, //post
  ADD_RESUME: `/api/v1/users/:username/add-resume`, //post
  SEARCH: `/api/v1/users/search`, //get
};

const PROFILE_ENDPOINTS = {
  FETCH_USER_PROFILE: `/api/v1/profiles/:username`
}

const SETTINGS_ENDPOINTS = {
  CHANGE_PASSWORD: `/api/v1/settings/change-password`, //post
  CHANGE_USER_SETTINGS: `/api/v1/settings/change-user-settings` //post
}




export { USER_ENDPOINTS, PROFILE_ENDPOINTS, SETTINGS_ENDPOINTS };
