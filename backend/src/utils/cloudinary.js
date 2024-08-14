// import { v2 as cloudinary } from 'cloudinary';
// import fs from "fs"

// cloudinary.config({ 
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  
//     api_key: process.env.CLOUDINARY_API_KEY, 
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// })

// const uploadFileToCloudinary = async (filePath) => {
//     try {
//         console.log("File uploading...");
        
//         if(!filePath) return null;
//         const response = await cloudinary.uploader.upload(filePath, {
//             resource_type: "auto",
//         })

//         // console.log(`File successfully uploaded, URL: ${response.url}`);
//         fs.unlinkSync(filePath)
//         return response
//     } catch (error) {
//         fs.unlinkSync(filePath)
//         console.log(`File uploading to cloudinary unsuccessful: ${error}`)
//         return null
//     }
// }

// export {uploadFileToCloudinary}

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadFileToCloudinary = async (fileBuffer, fileName) => {
    try {
        console.log("File uploading...");

        if (!fileBuffer) return null;

        // Create and return a promise
        const response = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    resource_type: "auto",
                    public_id: fileName,
                },
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary upload failed:", error);
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            ).end(fileBuffer); 
        });

        return response;
    } catch (error) {
        console.error(`File uploading to Cloudinary unsuccessful: ${error}`);
        return null;
    }
};

export { uploadFileToCloudinary };
