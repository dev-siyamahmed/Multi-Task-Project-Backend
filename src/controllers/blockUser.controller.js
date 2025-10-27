const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const response = require('../config/response')
const {blcokUserService} = require('../services')


const blockUser = catchAsync(async(req,res) =>{
    const userId = req.user.id
    const {profileId} = req.body

    const data = await blcokUserService.addBlock(userId ,profileId)

    res.status(httpStatus.CREATED).json(
        response({
            message:"User blocked successfully",
            status: 'Ok',
            statusCode : httpStatus.CREATED,
            data
        })
    )
})

const unBlockUser = catchAsync(async(req,res) =>{
    const userId = req.user.id
    const {profileId} = req.body

    const data = await blcokUserService.unBlockUser(userId , profileId)

    res.status(httpStatus.OK).json(
        response(
            {
                message : data.message,
                status:'Ok',
                statusCode:httpStatus.OK
            }
        )
    )
})

const getBlockUsers = catchAsync(async (req,res) =>{
    const userId = req.user.id
    const data = await blcokUserService.getBlockUsers(userId)

    res.status(httpStatus.OK).json(
        response({
            message: "Blocked users list",
            status: "Ok",
            statusCode: httpStatus.OK,
            data
        })
    )
})


module.exports ={
    blockUser,
    unBlockUser,
    getBlockUsers
}