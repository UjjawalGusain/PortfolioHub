import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadFileToCloudinary = async (filePath) => {
    try {
        console.log("File uploading...");
        
        if(!filePath) return null;
        const response = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto",
        })

        // console.log(`File successfully uploaded, URL: ${response.url}`);
        fs.unlinkSync(filePath)
        return response
    } catch (error) {
        fs.unlinkSync(filePath)
        console.log(`File uploading to cloudinary unsuccessful: ${error}`)
        return null
    }
}

export {uploadFileToCloudinary}