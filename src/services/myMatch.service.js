const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const { myMatch, User } = require('../models')
const { getUserById } = require('./user.service')
const blockUser = require('../models/block.model')

const createMatch = async (userId, profileId) => {
  if (userId.toString() === profileId.toString()) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You cannot match with yourself')
  }
  const profile = await getUserById(profileId)
  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Profile not found')
  }
 const existingMatch = await myMatch.findOne({
    $or : [
      {userId,profileId},
      {userId:profileId , profileId:userId}
    ]
  })


  if (existingMatch) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'you already sent a match request'
    )
  }

  const isBlocked = await blockUser.findOne({
    $or: [
      { userId, profileId },
      { userId: profileId, profileId: userId },
    ],
  })

  if (isBlocked) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You cannot match  this user because one of you has blocked the other'
    )
  }
  const match = await myMatch.create({ userId, profileId, status: 'pending' })
  return match
}

const acceptMatch = async (matchId, userId) => {
  const match = await myMatch.findById(matchId)
  console.log('accept', match)
  if (!match) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Match not found')
  }
  if (match.profileId.toString() !== userId.toString()) {
    throw new ApiError(httpStatus.FORBIDDEN, 'you cannot accept this match')
  }
  match.status = 'accepted'
  await match.save()
  return match
}

const rejectMatch = async (matchId, userId) => {
  const match = await myMatch.findById(matchId)

  if (!match) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Match not found')
  }
  if (match.profileId.toString() !== userId.toString()) {
    throw new ApiError(httpStatus.FORBIDDEN, 'you cannot reject this match')
  }
  match.status = 'rejected'
  await match.save()
  return match
}

const getMyMatches = async (userId) => {
  return myMatch
    .find({
      $or: [{ userId }, { profileId: userId }],
    })
    .populate('userId', 'fullName email')
    .populate('profileId', 'fullName email')
}

module.exports = {
  createMatch,
  acceptMatch,
  rejectMatch,
  getMyMatches,
}
