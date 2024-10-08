import { Router } from "express";
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  verifyOtp,
  fetchUserData,
  addProject,
  fetchUserProjects,
  sendEmail,
  deleteProject,
  addCertification,
  fetchCertifications,
  deleteCertification,
  addResume,
  searchUsers,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyTokens } from "../middlewares/auth.middleware.js";
import { limiter } from "../middlewares/rateLimiter.middleware.js";
import { otpAuth } from "../middlewares/otpAuth.middleware.js";
import { fetchProject } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.route("/register").post(
  upload.fields([
    {
      name: "profilePic",
      maxCount: 1,
    },
    {
      name: "coverImg",
      maxCount: 1,
    },
  ]),
  registerUser
);

userRouter.route("/login").post(loginUser);

// Secured Routes
userRouter.route("/logout").post(verifyTokens, logoutUser);
userRouter.route("/refresh-token").post(refreshAccessToken);
userRouter.route("/verify-otp").post(otpAuth, limiter, verifyOtp);
userRouter.route("/fetch-user-data").post(verifyTokens, fetchUserData);

userRouter.route("/add-project").post(
  verifyTokens,
  upload.fields([
    { name: "videos", maxCount: 3 },
    { name: "images", maxCount: 8 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  addProject
);

userRouter.get("/:username/projects", fetchUserProjects);
userRouter.get("/:username/projects/:projectName", fetchProject);
userRouter.post(
  "/:username/projects/deleteProject",
  verifyTokens,
  deleteProject
);

userRouter.post(
  "/:username/certifications/delete-certification",
  verifyTokens,
  deleteCertification
);

userRouter.post("/:username/contact", sendEmail);
userRouter.post(
  "/:username/certifications/add-certificate",
  verifyTokens,
  upload.fields([{ name: "certificateImg", maxCount: 1 }]),
  addCertification
);

userRouter.get("/:username/certifications", fetchCertifications);

userRouter.post(
  "/:username/add-resume",
  verifyTokens,
  upload.fields([{ name: "resume", maxCount: 1 }]),
  addResume
);

userRouter.get("/search", searchUsers)

export default userRouter;
