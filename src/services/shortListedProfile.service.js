const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const {shortListedProfile,User, notInterested,} = require('../models')
const { findIsBlocked } = require('./blockUser.service')
const { getUserById } = require('./user.service')


const addShortListProfile = async(userId , profileId)=>{

    if(userId.toString() === profileId.toString()){
        throw new ApiError(httpStatus.BAD_REQUEST , "you cannot shortList yourself")
    }
   const isBlocked = await findIsBlocked(userId , profileId)
   if (isBlocked.length >0) {
    throw new ApiError(httpStatus.FORBIDDEN , "you cannot shortlist a blockUser")
   }

   const isNotInterested = await notInterested.findOne({userId,profileId})
   if(isNotInterested){
    throw new ApiError(httpStatus.FORBIDDEN , "You already marked this user as notInterested ")

   }
   const profile = await getUserById(profileId)
   if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND ,"Profile not found")
   }
   const already = await shortListedProfile.findOne({userId, profileId})
   if (already) {
    throw new ApiError(httpStatus.BAD_REQUEST ,"Already shortListed")
   }

   const shortlist = await shortListedProfile.create({userId , profileId})
   return shortlist
}

const getShortListProfiles = async (userId)=>{
   return shortListedProfile.find({userId})
    .populate("profileId")
    .sort({createAt : -1})
}

const removeShortListProfile = async(userId , profileId) =>{
    const shortList = await shortListedProfile.findOneAndDelete({userId, profileId})
    if (!shortList) {
        throw new ApiError(httpStatus.NOT_FOUND , "shortListed profile not found")
    }
    return shortList
}

module.exports = {
    addShortListProfile,
    getShortListProfiles,
    removeShortListProfile
}