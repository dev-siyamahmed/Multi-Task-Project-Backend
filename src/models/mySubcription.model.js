const mongoose = require('mongoose')





const mySubcriptionSchema = mongoose.Schema({
    subcriptionId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Subscription',
        required : true
    },
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    subscriptionExpirationDate :{
        type: Date,
        required:true,
        
    },
    name:{
        type:String,
        requried:true,
        trim:true
    },
    duration:{
        type:String,
        required:true
    },
    price : {
        type:Number,
        required:true
    },
    sendReminder : {
        type:String,
        required:true,
        default: 0
    },
    sendMessage : {
        type:Number,
        required: true,
        default: 0
    },
    matchesMessageLimit:{
        type: Number,
        required:true,
        default: 4
    },
    isActive :{
        type:Boolean,
        default: false
    }
})


const mySubcription = mongoose.model('mySubcription' , mySubcriptionSchema)

module.exports = mySubcription