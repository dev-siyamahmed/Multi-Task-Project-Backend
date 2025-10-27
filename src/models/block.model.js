
const mongoose = require('mongoose')


const blockUserSchema = mongoose.Schema({
    userId : {
        type:mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required:true
    },
    profileId : {
        type:mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required:true
    }
},{ timestamps: true,})

const blockUser = mongoose.model('blockUser' , blockUserSchema)

module.exports = blockUser