import connect_database from "./db/index.js"
import dotenv from "dotenv"

dotenv.config({
    path: "./env"
})

connect_database()