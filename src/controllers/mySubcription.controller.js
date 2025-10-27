const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const response = require('../config/response')
const {User} = require('../models')
const {mySubcriptionService, userService} = require('../services')


const buySubcription = catchAsync(async (req,res) =>{
  const userId = req.user.id 
  const {subcriptionId} = req.body


  const data = await mySubcriptionService.buySubcription(userId , subcriptionId)
  res.status(httpStatus.CREATED).json(
    response({
      message : "subcription purchased successfully",
      status: "OK",
      statusCode : httpStatus.CREATED,
      data
    })
  )
})






const getMySubctiptions = catchAsync(async(req,res) =>{
    const userId =  req.user.id
    if (!userId) {
        return res.status(httpStatus.UNAUTHORIZED).json({
            status : "Fail",
            message: "user not authenticated",
            statusCode:httpStatus.UNAUTHORIZED
        })
    }
    const data = await mySubcriptionService.getMySubctiptions(userId)

    res.status(httpStatus.OK).json(
    response({
      message: "Your subscriptions",
      status: "OK",
      statusCode: httpStatus.OK,
      data,
    })
  );
})


const getMySubctiption = catchAsync(async (req,res) =>{
  const userId = req.user.id
  const data = await mySubcriptionService.getMySubctiption(req.params.id , userId)

  res.status(httpStatus.OK).json(
    response({
      message: "subsctiption details",
      status: "Ok",
      statusCode : httpStatus.OK,
      data
    })
  )
})

module.exports ={
    getMySubctiptions,
    buySubcription,
    getMySubctiption
}