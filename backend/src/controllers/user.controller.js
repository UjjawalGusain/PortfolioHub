import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadFileToCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { isValidEmail, isValidGitHubId } from "../utils/validator.js";

const registerUser = asyncHandler(async (req, res) => {
    const {username, fullname, email, password, githubId} = req.body;
    console.log(username);

    // verifying if all required fields are filled
    if([username, fullname, email, password, githubId].some((field) => 
    field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    if(!isValidEmail(email)) {
        throw new ApiError(400, "Email not acceptable")
    }

    if(!isValidGitHubId(githubId)) {
        throw new ApiError(400, "Github ID not acceptable")
    }

    //checking if the username exists already
    const existedUser = await User.findOne({
        $or: [{username}, {email}, {githubId}]
    })

    if(existedUser) {
        throw new ApiError(409, "Username/email/github already exists")
    }

    let profilePicLocalPath;
    if(req.files && Array.isArray(req.files.profilePic) && req.files.profilePic.length > 0) {
        profilePicLocalPath = req.files.profilePic[0].path
    }

    let coverImgLocalPath;
    if(req.files && Array.isArray(req.files.coverImg) && req.files.coverImg.length > 0) {
        coverImgLocalPath = req.files.coverImg[0].path
    }

    const profilePic = await uploadFileToCloudinary(profilePicLocalPath)
    const coverImg = await uploadFileToCloudinary(coverImgLocalPath)

    const user = await User.create({
        fullname,
        profilePic: profilePic?.url || "",
        coverImg: coverImg?.url || "",
        username: username.toLowerCase(),
        email,
        githubId,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser) {
        throw new ApiError(500, "Failed to register user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
    )

})

const generateAccessTokenAndRefreshToken = async(userId) => {
    const user = await User.findById(userId)

    const refreshToken = user.generateRefreshToken()
    const accessToken = user.generateAccessToken()

    user.refreshToken = refreshToken

    await user.save({validateBeforeSave: false})

    return {refreshToken, accessToken}
}

const loginUser = asyncHandler(async (req, res) => {
    // Take data from user (username, password)
    // Take this data from req.body
    // Find the username in the database, if found, check if the password matches
    // If it does not match, throw error
    // Else, generate an access token and a refresh token
    // Send cookies
    // Send success response

   const {email, username, githubId, password} = req.body;
   
   // verifying if all required fields are filled
   if([username, email, password, githubId].some((field) => 
    field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const foundUser = await User.findOne({
        $or: [{username}, {githubId}, {email}]
    })

    if(!foundUser) {
        throw new ApiError(404, "User not found");
    }

    const isPassValid = await foundUser.isPasswordCorrect(password)

    if(!isPassValid) {
        throw new ApiError(401, "Incorrect Password")
    }

    const {refreshToken, accessToken} = await generateAccessTokenAndRefreshToken(user._id)

    const newUser = User.findById(user._id).select("-password -refreshToken")

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

export {registerUser}