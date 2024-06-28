import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"



const connect_database = async() => {
    try {

        const connection_instance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`MongoDB Connection Successful. Host: ${connection_instance.connection.host}`)

    } catch (error) {
        console.log("MongoDB connection error: ", error)
        process.exit(1)
    }
}

export default connect_database