import {Router} from "express"
import { verifyTokens } from "../middlewares/auth.middleware.js"
import { fetchProfileData } from "../controllers/profile.controller.js"

const profileRouter = Router()

profileRouter.route("/:username").get(
    fetchProfileData
)

export default profileRouter