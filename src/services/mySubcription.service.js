const {mySubcription , Subcription} = require('../models')
const ApiError = require('../utils/ApiError')
const httpStatus = require('http-status')
const { getUserById } = require('./user.service')


const buySubcription = async (userId , subcriptionId) =>{
    
    const subcription = await Subcription.findById(subcriptionId)
    const user = await getUserById(userId)


    switch (subcription.name) {
        case "basic":
            user.MetchRequestCredit = 20,
            user.interestRequestCredit = 15,
            user.subcription = {
                subcriptionId : subcription._id ,
                subscriptionExpirationDate:new Date(Date.now() + subcription.days * 24 * 60 * 60 * 1000),
                status : "active",
                isSubscriptionTaken : true
            }
            await user.save()
            break;
            case "silver" : 
            user.MetchRequestCredit = 50,
            user.interestRequestCredit = 30,
            user.subcription = {
                subcriptionId : subcription._id,
                subscriptionExpirationDate:new Date(Date.now() + subcription.days * 24 * 60 * 60 * 1000),
                status : "active",
                isSubscriptionTaken : true,
            },
            await user.save();
            break;
            case "gold" : 
            user.MetchRequestCredit = 100,
            user.interestRequestCredit = 90,
            user.subcription = {
                subcriptionId : subcription._id,
                subscriptionExpirationDate:new Date(Date.now() + subcription.days * 24 * 60 * 60 * 1000),
                status : "active",
                isSubscriptionTaken : true,
            },
            await user.save();
            break;
        default:
            throw new ApiError(httpStatus.BAD_REQUEST,"The name is invalid")
            break;
    }
    
     user.subscription = {
    subscriptionId: subcription._id,
     subscriptionExpirationDate:new Date() + subcription.days,
    status: 'active',
    isSubscriptionTaken: true,
  };

    const newMySub = await mySubcription.create({
    subcriptionId: subcription._id,
    userId: user._id,
    subscriptionExpirationDate:new Date(Date.now() + subcription.days * 24 * 60 * 60 * 1000),
    name: subcription.name,
    duration: `${subcription.days} days`,
    price: subcription.price,
    matchesMessageLimit: user.MetchRequestCredit,
    sendMessage: user.interestRequestCredit,
    isActive: true,
  });
    return {user ,mySubcription: newMySub}
}


const getMySubctiptions = async(userId) =>{
    const subcriptions = await mySubcription.find({
        userId,
        isActive : true
    })
    .populate("subcriptionId")
    .populate("userId")

    return subcriptions
}

const getMySubctiption = async (id , userId) =>{
    console.log(userId)
    console.log("id" , id)
    const mysub = await mySubcription.findOne({
        _id : id,
        userId,
       
    })
    .populate("subcriptionId")
    .populate("userId")

    if (!mysub) {
        throw new ApiError(httpStatus.NOT_FOUND , "Subsctiption not found")
    }
    return mysub
}



module.exports = {
    getMySubctiptions,
    buySubcription,
    getMySubctiption
}