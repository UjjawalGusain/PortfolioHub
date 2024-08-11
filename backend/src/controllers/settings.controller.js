import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadFileToCloudinary } from "../utils/cloudinary.js";

const changePassword = asyncHandler(async (req, res) => {
    try {
        const userId = req.user?._id;

        if (!userId) {
            throw new ApiError(404, "User not found");
        }

        const { newPassword, oldPassword } = req.body;

        if (!newPassword || !oldPassword) {
            throw new ApiError(400, "Both old and new passwords are required");
        }

        const user = await User.findById(userId);

        const isPassCorrect = await user.isPasswordCorrect(oldPassword);

        if (!isPassCorrect) {
            throw new ApiError(401, "Wrong password");
        }

        user.password = newPassword;
        await user.save();

        return res.status(200).json(new ApiResponse(200, {}, "User password changed successfully"));
    } catch (error) {
        console.error('Error changing password:', error);
        if (error instanceof ApiError) {
            throw error;
        } else {
            throw new ApiError(500, 'Password change failed. Please try again.');
        }
    }
});

const changeUserSettings = asyncHandler(async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            throw new ApiError(404, "User not found");
        } 

        const { username, fullname, position, description } = req.body;
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

        const userDoc = await User.findById(user._id);
        if (!userDoc) {
            throw new ApiError(404, "User not found");
        }

        if (username) userDoc.username = username;
        if (profilePicUrl) userDoc.profilePic = profilePicUrl;
        if (coverImgUrl) userDoc.coverImg = coverImgUrl;
        if (fullname) userDoc.fullname = fullname;
        if (position) userDoc.position = position;
        if (description) userDoc.description = description;

        await userDoc.save();
        return res.status(200).json(new ApiResponse(200, userDoc, "User settings changed successfully"));
    } catch (error) {
        console.error('Error changing settings:', error);
        if (error instanceof ApiError) {
            throw error;
        } else {
            throw new ApiError(500, 'Settings change failed. Please try again.');
        }
    }
});


export {changePassword, changeUserSettings}