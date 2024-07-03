import { OtpVerification } from "../models/otp.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const otpAuth = asyncHandler( async(req, _, next) => {

    try {
        const email = req.body?.userData?.email
        if(!email) {
            throw new ApiError(404, "User not found in database")
        }
    
        const otp = await OtpVerification.findOne({email})
    
        if(!otp) {
            throw new ApiError(404, "User not found in database")
        }
    
        if(!otp.isRegistered) {
            throw new ApiError(403, "Access to this resource is forbidden")
        }
        next()
    } catch (error) {
        console.error('Error in otpAuth middleware:', error);
        if (error instanceof ApiError) {
            throw error; 
        } else {
            throw new ApiError(500, 'Internal server error');
        }
    }
} )