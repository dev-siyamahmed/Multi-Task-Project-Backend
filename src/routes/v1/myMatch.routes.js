const express = require('express')
const auth = require('../../middlewares/auth')
const myMatchController = require('../../controllers/myMatch.controller')
const myMatchRoute = express.Router()

myMatchRoute.post('/' , auth() ,myMatchController.createMatch )
myMatchRoute.patch('/:matchId/accept' ,auth() , myMatchController.acceptMatch)
myMatchRoute.patch('/:matchId/reject' ,auth() , myMatchController.rejectMatch)
myMatchRoute.get('/' ,auth() , myMatchController.getMyMatches)


module.exports = myMatchRoute