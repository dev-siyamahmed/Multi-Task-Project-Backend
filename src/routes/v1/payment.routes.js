const express = require('express')
const auth = require('../../middlewares/auth')
const {paymentController} = require('../../controllers')
const paymentRoute = express.Router()

paymentRoute.post('/create' , auth(),paymentController.createStripePayment)

module.exports = paymentRoute