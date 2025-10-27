const express = require('express')
const auth = require('../../middlewares/auth')
const {blockUserController} = require('../../controllers')

const blockUserRoute = express.Router()


blockUserRoute.post('/' , auth(),blockUserController.blockUser)
blockUserRoute.delete('/', auth() , blockUserController.unBlockUser)
blockUserRoute.get('/', auth() , blockUserController.getBlockUsers)


module.exports = blockUserRoute