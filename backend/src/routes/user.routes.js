import {Router} from "express"
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js"
import { upload } from "../middlewares/multer.middleware.js"
import { verifyTokens } from "../middlewares/auth.middleware.js"

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


export default userRouter