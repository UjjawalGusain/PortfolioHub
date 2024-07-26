import mongoose, { Schema } from "mongoose";

const certificationSchema = new Schema({
    certificateImg: {
        type: String, // cloudinary
        required: true,
    },
    title: {
        type: String, 
        required: true,
    },
    description: {
        type: String, 
        required: true,
    },
});

export const Certification = mongoose.model("Certification", certificationSchema);
