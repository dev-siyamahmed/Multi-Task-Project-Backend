const express = require('express')
const auth = require('../../middlewares/auth')
const {shortListProfileController} = require('../../controllers')


const shortListedProfileRoute = express.Router()


shortListedProfileRoute.post('/' , auth() , shortListProfileController.addShortListProfile)
shortListedProfileRoute.get('/' , auth() , shortListProfileController.getShortListProfiles)
shortListedProfileRoute.delete('/:profileId' , auth() , shortListProfileController.removeShortListProfile)


module.exports = shortListedProfileRoute