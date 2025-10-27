const httpStatus = require("http-status")
const catchAsync  = require("../utils/catchAsync")
const response = require("../config/response")
const {myMatchService} = require('../services')

const createMatch = catchAsync(async(req , res) =>{
    const userId = req.user.id
    const {profileId} = req.body
    

    const match = await myMatchService.createMatch(userId , profileId)

    res.status(httpStatus.CREATED).json(
        response({
            message : "Match request sent successfully",
            status: "Ok",
            statusCode : httpStatus.CREATED,
            data : match
        })
    )
})

const acceptMatch = catchAsync(async(req,res) =>{
    const userId =req.user.id
    const {matchId} = req.params

    const match = await myMatchService.acceptMatch(matchId , userId)

    res.status(httpStatus.OK).json(
        response({
            message : "match accepted",
            status : "OK" ,
            statusCode: httpStatus.OK,
            data:match
        })
    )
})

const rejectMatch = catchAsync(async(req,res) =>{
    console.log(req.params)
    console.log(req.user.id)
    console.log('upp')
    const userId = req.user.id
    const {matchId} = req.params
    console.log('medel')
    const match = await myMatchService.rejectMatch(matchId,userId)
    console.log('bottom')
    console.log("match controller" , match)

    res.status(httpStatus.OK).json(
        response({
            message : "match rejected" ,
            status: "Ok",
            statusCode:httpStatus.OK,
            data:match
        })
    )
})

const getMyMatches = catchAsync(async(req,res) =>{
    const userId = req.user.id
    const mathes = await myMatchService.getMyMatches(userId)
      res.status(httpStatus.OK).json(
    response({
      message: "All Matches",
      status: "OK",
      statusCode: httpStatus.OK,
      data:mathes,
    })
  );
})





module.exports = {
    createMatch,
    acceptMatch,
    rejectMatch,
    getMyMatches
}