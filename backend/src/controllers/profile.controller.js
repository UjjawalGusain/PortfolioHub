import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const fetchProfileData = asyncHandler(async (req, res) => {
    try {
        const {username} = req.params
    
        const user = await User.findOne({username}).select(
            "-password -refreshToken"
        )
    
        if (!user) {
            throw new ApiError(404, `Owner with username ${username} not found`);
        }

        // console.log(user);
    
        return res.status(200).json(new ApiResponse(200, user, "Found User"));
    } catch (error) {
        if (error instanceof ApiError) {
            throw error
        } else {
            throw new ApiError(404, `internal error`);
        }
    }

})

export {fetchProfileData}