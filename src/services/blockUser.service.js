const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const {blockUser, User} = require('../models')
const {userService} = require('../services')



const addBlock = async(userId , profileId) =>{

    if(userId.toString() === profileId.toString()){
        throw new ApiError(httpStatus.BAD_REQUEST , "You cannot block yourself")
    }

    const profile = await userService.getUserById(profileId)
    if (!profile) {
        throw new ApiError(httpStatus.NOT_FOUND , "User not found")
    }
    const alreadyBlocked = await blockUser.findOne({userId , profileId})

    if (alreadyBlocked) {
        throw new ApiError(httpStatus.BAD_REQUEST , "User already blocked")
    }

    const block = await blockUser.create({userId , profileId})
    return block
}

const unBlockUser = async (userId , profileId) =>{


    const block = await blockUser.findOne({userId ,profileId})

    if (!block) {
        throw new ApiError(httpStatus.NOT_FOUND , "this user is not blocked")
    }
    if(block.userId.toString() !== userId.toString()){
        throw new ApiError(httpStatus.BAD_REQUEST , "You cannot unBlock")
    }
    await block.deleteOne()
    return {message : "User unBlocked successfully"}
}   

const getBlockUsers= async(userId) =>{
    return blockUser.find({userId})
    .populate("profileId")
}

const findIsBlocked = async(userId , profileId) =>{
    const isBlocked = await blockUser.find({
        $or:[
            {userId , profileId},
            {userId:profileId , profileId:userId}
        ]
    })
    return isBlocked
}

module.exports={
    addBlock,
    unBlockUser,
    getBlockUsers,
    findIsBlocked
}