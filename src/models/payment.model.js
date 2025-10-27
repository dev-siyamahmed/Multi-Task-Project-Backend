const mongoose = require('mongoose')



const paymentSchema = new mongoose.Schema({
    userId : {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    subName:{
        type:String,
        enum: ['basic' , 'silver' ,'gold'],
        default : 'basic'
    },
    price:{
        type:Number,
        required :true,
        default : 'usd'
    },
    paymentMethod : {
        type:String,
        default : 'Stripe'
    },
    sessionId: {
        type:String
    },
    paymentStatus: { 
        type: String, 
        enum: ['pending', 'paid', 'failed'], default: 'pending' 
    },
},{timestamps:true})

const Payment = mongoose.model('Payment' , paymentSchema)

module.exports = Payment