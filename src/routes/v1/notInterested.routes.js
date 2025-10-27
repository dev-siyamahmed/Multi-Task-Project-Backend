const express = require('express')
const auth = require('../../middlewares/auth')
const { notInterestedController } = require('../../controllers')

const notInterestedRoute = express.Router()

notInterestedRoute.post('/' ,auth() , notInterestedController.createNotInterested)
notInterestedRoute.get('/' ,auth(),notInterestedController.getNotInteresteds)
notInterestedRoute.delete('/:profileId' ,auth() , notInterestedController.removeNotInterested)

module.exports = notInterestedRoute