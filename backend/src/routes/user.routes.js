import {Router} from "express"
import { loginUser, logoutUser, refreshAccessToken, registerUser, verifyOtp, fetchUserData } from "../controllers/user.controller.js"
import { upload } from "../middlewares/multer.middleware.js"
import { verifyTokens } from "../middlewares/auth.middleware.js"
import { limiter } from "../middlewares/rateLimiter.middleware.js"
import { otpAuth } from "../middlewares/otpAuth.middleware.js"

const userRouter = Router()

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
)

userRouter.route("/login").post(loginUser)


// Secured Routes
userRouter.route("/logout").post(verifyTokens, logoutUser)
userRouter.route("/refresh-token").post(refreshAccessToken)
userRouter.route("/verify-otp").post(otpAuth, limiter, verifyOtp)
userRouter.route("/fetch-user-data").post(verifyTokens, fetchUserData)

export default userRouter 