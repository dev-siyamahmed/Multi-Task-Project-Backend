const express = require('express')
const mySubcriptionController = require('../../controllers/mySubcription.controller')
const auth  = require('../../middlewares/auth')

const mySubcriptionRoute= express.Router()

mySubcriptionRoute.get('/all',auth(),mySubcriptionController.getMySubctiptions)
mySubcriptionRoute.post('/buy' , auth() , mySubcriptionController.buySubcription)
mySubcriptionRoute.get('/:id' , auth() , mySubcriptionController.getMySubctiption)


module.exports = mySubcriptionRoute