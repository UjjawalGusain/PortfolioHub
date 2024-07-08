import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadFileToCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { isValidEmail, isValidGitHubId } from "../utils/validator.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { OtpVerification } from "../models/otp.model.js";
import { sendOtpVerificationEmail } from "../utils/sendOtpVerificationEmail.js";
import { generateAccessTokenAndRefreshToken } from "../utils/generateAccessTokenAndRefreshToken.js";

const registerUser = asyncHandler(async (req, res) => {
    try {
        const { username, fullname, email, password, githubId } = req.body;

        if ([username, fullname, email, password, githubId].some((field) => field?.trim() === "")) {
            throw new ApiError(400, "All fields are required");
        }
 
        if (!isValidEmail(email)) {
            throw new ApiError(400, "Email not acceptable");
        }

        if (!isValidGitHubId(githubId)) {
            throw new ApiError(400, "Github ID not acceptable");
        }

        const existedUser = await User.findOne({
            $or: [{ username }, { email }, { githubId }]
        });

        if (existedUser) {
            throw new ApiError(409, "Username/email/github already exists");
        }

        let profilePicUrl = "";
        let coverImgUrl = "";

        if (req.files && req.files.profilePic) {
            const profilePicLocalPath = req.files.profilePic[0].path;
            const profilePic = await uploadFileToCloudinary(profilePicLocalPath);
            profilePicUrl = profilePic?.url || "";
        }

        if (req.files && req.files.coverImg) {
            const coverImgLocalPath = req.files.coverImg[0].path;
            const coverImg = await uploadFileToCloudinary(coverImgLocalPath);
            coverImgUrl = coverImg?.url || "";
        }

        const userData = {
            fullname,
            profilePic: profilePicUrl,
            coverImg: coverImgUrl,
            username: username.toLowerCase(),
            email,
            githubId,
            password
        }

        req.userData = userData

        // Send OTP email  
        await sendOtpVerificationEmail(req, res);


        return res.status(201).json(new ApiResponse(201, req.userData, "User registered successfully"));
    } catch (error) {
        console.error('Error during registration:', error);
        if (error instanceof ApiError) {
            throw error;
        } else {
            throw new ApiError(500, 'Registration failed. Please try again.');
        }
    }
});

const verifyOtp = asyncHandler(async (req, res) => {
    try {
        const userOtp = req.body?.otp;
        const email = req.body?.userData?.email
        if (!userOtp || !email) {
            throw new ApiError(400, "OTP and user email are required");
        }

        const otpVer = await OtpVerification.findOne({ email });
        if (!otpVer) {
            throw new ApiError(404, "User not found in database");
        }

        const doesOtpMatch = await bcrypt.compare(userOtp, otpVer.otp);
        if (!doesOtpMatch) {
            throw new ApiError(400, "Wrong OTP");
        }

        await OtpVerification.findByIdAndDelete(otpVer._id);

        const newUser = await User.create(req.body.userData)

        return res.status(200).json(new ApiResponse(200, newUser, "OTP verified"));
    } catch (error) {
        console.error('Error verifying OTP:', error);
        if (error instanceof ApiError) {
            throw error; 
        } else {
            throw new ApiError(500, 'Verification failed. Please try again.');
        }
    }
});

const loginUser = asyncHandler(async (req, res) => {
    // Take data from user (username, password)
    // Take this data from req.body
    // Find the username in the database, if found, check if the password matches
    // If it does not match, throw error
    // Else, generate an access token and a refresh token
    // Send cookies
    // Send success response

   const {email, username, githubId, password} = req.body;
   console.log(req.body);
   // verifying if all required fields are filled

    if((!(username || email || githubId) && password)) {
        throw new ApiError(400, "One identification field and password field is required")
    }


    const foundUser = await User.findOne({
        $or: [{username}, {githubId}, {email}]
    })

    // console.log(foundUser)    

    if(!foundUser) {
        throw new ApiError(404, "User not found");
    }

    const isPassValid = await foundUser.isPasswordCorrect(password)

    if(!isPassValid) {
        throw new ApiError(401, "Incorrect Password")
    }

    const {refreshToken, accessToken} = await generateAccessTokenAndRefreshToken(foundUser._id)

    const newUser = await User.findById(foundUser._id).select("-password -refreshToken")

    const cookieOption = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
           .cookie("accessToken", accessToken, cookieOption)
           .cookie("refreshToken", refreshToken, cookieOption)
           .json(new ApiResponse(200, {
                user: newUser,
                accessToken,
                refreshToken
           },
        "User Logged In Successfully"))
})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const cookieOption = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
           .clearCookie("refreshToken", cookieOption)
           .clearCookie("accessToken", cookieOption)
           .json(new ApiResponse(200, {}, "User Logged Out Successfully"))
})

const refreshAccessToken = asyncHandler( async(req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized Access")
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id)
    
        if(!user) {
            throw new ApiError(401, "Invalid Refresh Token")
        }
    
        if(incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token expired or used")
        }    
    
        const {newRefreshToken, accessToken} = await generateAccessTokenAndRefreshToken(user._id)
    
        const cookieOption = {
            httpOnly: true,
            secure: true
        }
    
        return res.status(200)
               .cookie("accessToken", accessToken, cookieOption)
               .cookie("refreshToken", newRefreshToken, cookieOption)
                .json(new ApiResponse(200, {
                    accessToken,
                    refreshToken: newRefreshToken,
                },
                "Access Token Refreshed"))
    } catch (error) {
        throw new ApiError(401, "Invalid Refresh Token")
    }
})

export {registerUser, loginUser, logoutUser, refreshAccessToken, verifyOtp}