// USER ENDPOINTS
const USER_ENDPOINTS = {
  REGISTER: `https://portfolio-hub-backend.vercel.app/api/v1/users/register`,
  LOGIN: `https://portfolio-hub-backend.vercel.app/api/v1/users/login`,
  LOGOUT: `https://portfolio-hub-backend.vercel.app/api/v1/users/logout`,
  REFRESH_TOKEN: `https://portfolio-hub-backend.vercel.app/api/v1/users/refresh-token`,
  VERIFY_OTP: `https://portfolio-hub-backend.vercel.app/api/v1/users/verify-otp`,
  FETCH_USER_DATA: `https://portfolio-hub-backend.vercel.app/api/v1/users/fetch-user-data`,
  ADD_PROJECT: `https://portfolio-hub-backend.vercel.app/api/v1/users/add-project`, // post
  FETCH_USER_PROJECTS: `https://portfolio-hub-backend.vercel.app/api/v1/users/:username/projects`, // get
  FETCH_PROJECT: `https://portfolio-hub-backend.vercel.app/api/v1/users/:username/projects/:projectName`, //get
  SEND_EMAIL: `https://portfolio-hub-backend.vercel.app/api/v1/users/:username/contact`, //get
  DELETE_PROJECT: `https://portfolio-hub-backend.vercel.app/api/v1/users/:username/projects/deleteProject`,
  ADD_CERTIFICATION: `https://portfolio-hub-backend.vercel.app/api/v1/users/:username/certifications/add-certificate`, //post
  FETCH_CERTIFICATIONS: `https://portfolio-hub-backend.vercel.app/api/v1/users/:username/certifications`, //get
  DELETE_CERTIFICATION: `https://portfolio-hub-backend.vercel.app/api/v1/users/:username/certifications/delete-certification`, //post
  ADD_RESUME: `https://portfolio-hub-backend.vercel.app/api/v1/users/:username/add-resume`, //post
  SEARCH: `https://portfolio-hub-backend.vercel.app/api/v1/users/search`, //get
};

const PROFILE_ENDPOINTS = {
  FETCH_USER_PROFILE: `https://portfolio-hub-backend.vercel.app/api/v1/profiles/:username`
}

const SETTINGS_ENDPOINTS = {
  CHANGE_PASSWORD: `https://portfolio-hub-backend.vercel.app/api/v1/settings/change-password`, //post
  CHANGE_USER_SETTINGS: `https://portfolio-hub-backend.vercel.app/api/v1/settings/change-user-settings` //post
}




export { USER_ENDPOINTS, PROFILE_ENDPOINTS, SETTINGS_ENDPOINTS };
