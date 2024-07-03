import mongoose, { Schema } from "mongoose";

const otpVerificationSchema = new Schema({
    otp: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    isRegistered: {
        type: Boolean,
        default: false,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300, // This automatically deletes the document after 5 minutes
    }
});

// Ensure index is created for expiration
otpVerificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

export const OtpVerification = mongoose.model("OtpVerification", otpVerificationSchema);
