const mongoose = require('mongoose')

const shortListedProfileSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
},{timestmps:true})


const shortListedProfile = mongoose.model("shortListProfile" , shortListedProfileSchema)
module.exports = shortListedProfile