import { User } from "../models/user.model.js"

export const generateAccessTokenAndRefreshToken = async(userId) => {
    const user = await User.findById(userId)

    const refreshToken = user.generateRefreshToken()
    const accessToken = user.generateAccessToken()

    user.refreshToken = refreshToken

    await user.save({validateBeforeSave: false})

    return {refreshToken, accessToken}
}