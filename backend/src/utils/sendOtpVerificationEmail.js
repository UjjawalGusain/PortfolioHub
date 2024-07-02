import otpGenerator from "otp-generator"
import { OtpVerification } from "../models/otp.model.js";
import bcrypt from "bcrypt"
import nodemailer from "nodemailer"
import { asyncHandler } from "./asyncHandler.js";
import { ApiError } from "./ApiError.js";

const transporter=nodemailer.createTransport({
    host:process.env.AUTH_SENDER_HOST,
    auth:{
        user:process.env.AUTH_SENDER_EMAIL,
        pass:process.env.AUTH_SENDER_PASSWORD,
    }
});

export const sendOtpVerificationEmail = asyncHandler(async (req, _) => {
    try {
        const otp = otpGenerator.generate(6, { 
            upperCaseAlphabets: false, 
            specialChars: false,
            lowerCaseAlphabets: false,
        });

        const mailOptions = {
            from: process.env.AUTH_SENDER_EMAIL,  
            to: req.body.email,   
            subject: 'OTP For Project Manager',         
            html: `<p>Your OTP (One Time Password) for verification is <strong>${otp}</strong></p>`
        };

        const saltRounds = 10;
        const hashedOtp = await bcrypt.hash(otp, saltRounds);
        const newOtpVerification = new OtpVerification({
            otp: hashedOtp,
            userId: req._id,
            email: req.body.email
        });

        await newOtpVerification.save({validateBeforeSave: false});
        // console.log('OTP verification record saved:', newOtpVerification);
        await transporter.sendMail(mailOptions);
        // console.log('OTP email sent');
    } catch (error) {
        console.error('Error saving OTP verification record:', error);
        if (error instanceof ApiError) {
            throw error; 
        } else {
            throw new ApiError(500, 'Registration failed. Please try again.');
        }
    }
});