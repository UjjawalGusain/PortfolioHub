import { Router } from "express";
import { changePassword, changeUserSettings } from "../controllers/settings.controller.js";
import { verifyTokens } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const settingsRouter = Router()


// Secured Routes

settingsRouter.route("/change-user-settings").post(
    verifyTokens,
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
    changeUserSettings
)
settingsRouter.route('/change-password').post(verifyTokens, changePassword)
export default settingsRouter