const httpStatus = require('http-status')
const response = require('../config/response')
const catchAsync = require('../utils/catchAsync')
const {paymentService} = require('../services')

const createStripePayment = catchAsync(async(req ,res) =>{
    const {subName , price } = req.body
    const userId = req.user._id 
    console.log('userid ' , userId)
    const checkoutUrl = await paymentService.createStripeSession(userId ,subName , price )

    res.status(httpStatus.OK).json(
        response({
            message : "Stripe checkout session created successfully",
            status:"OK",
            statusCode:httpStatus.OK,
            data:checkoutUrl
        })
    )
})

module.exports ={createStripePayment}