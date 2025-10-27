const httpStatus =require('http-status')
const catchAsync = require('../utils/catchAsync')
const response = require('../config/response')
const {shortListedProfileService} = require('../services')



const addShortListProfile=catchAsync(async(req ,res) =>{
    const userId = req.user.id 
    const profileId = req.body.profileId
    const data = await shortListedProfileService.addShortListProfile(userId,profileId)

    res.status(httpStatus.CREATED).json(
        response({
            message:"profile added to shortList",
            status:"Ok",
            statusCode:httpStatus.CREATED,
            data
        })
    )
})

const getShortListProfiles = catchAsync(async(req,res)=>{
    const userId = req.user.id 
    const data = await shortListedProfileService.getShortListProfiles(userId)
    res.status(httpStatus.OK).json(
        response({
            message: "Your short List profile",
            status: "Ok",
            statusCode:httpStatus.OK,
            data
        })
    )
})

const removeShortListProfile= catchAsync(async(req,res) =>{
    const userId = req.user.id 
    const profileId = req.params.profileId
    const data = await shortListedProfileService.removeShortListProfile(userId , profileId)

    res.status(httpStatus.OK).json(
        response({
            message : "profile remove from shortList",
            status: "Ok",
            statusCode:httpStatus.OK,
            data
        })
    )
})

module.exports ={
    addShortListProfile,
    getShortListProfiles,
    removeShortListProfile
}