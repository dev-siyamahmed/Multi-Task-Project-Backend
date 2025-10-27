
const mongoose = require('mongoose')


const notInterestedSchema = mongoose.Schema({
    userId :{
        type:mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true
    },
    profileId :{
        type:mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true
    }
},{timestamps : true})


const notInterested = mongoose.model('notInterested' , notInterestedSchema)

module.exports = notInterested