import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express()
app.use(cors({
    origin: '*',
    credentials: true,
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public"))

app.use(cookieParser())

import userRouter from "./routes/user.routes.js"
import settingsRouter from "./routes/settings.routes.js"
import profileRouter from "./routes/profiles.routes.js"
app.use("/api/v1/users", userRouter)
app.use("/api/v1/settings", settingsRouter)
app.use("/api/v1/profiles", profileRouter)

export {app}