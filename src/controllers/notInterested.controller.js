const httpstatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const response = require('../config/response')
const {notInterestedService} = require('../services')


const createNotInterested = catchAsync(async(req,res) =>{
    const userId = req.user.id
    const {profileId} = req.body

    const data = await notInterestedService.createNotInterested(userId,profileId)

    res.status(httpstatus.OK).json(
        response({
            message : "Profile select as a Not Interested",
            status:"OK",
            statusCode : httpstatus.CREATED,
            data
        })
    )
})


const getNotInteresteds = catchAsync(async(req,res) =>{
    const userId = req.user.id
    const profileId = req.params.profileId
    const data = await notInterestedService.getNotInteresteds(userId,profileId)
    
    res.status(httpstatus.OK).json(
        response({
            message : "Not Intersted Profiles",
            status:"OK",
            statusCode:httpstatus.OK,
            data,
        })
    )

})


const removeNotInterested = catchAsync(async(req,res) =>{
    const userId = req.user.id 
    const profileId = req.params.profileId
    const data =await notInterestedService.removeNotInterested(userId , profileId)
    res.status(httpstatus.OK).json(
        response({
            message: "Remove from not interested list",
            status:"Ok",
            statusCode:httpstatus.OK,
            data
        })
    )
})
module.exports ={
    createNotInterested,
    getNotInteresteds,
    removeNotInterested
}