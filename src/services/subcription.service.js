const {Subcription} = require('../models')
const httpStatus = require("http-status")
const ApiError = require('../utils/ApiError')
const { object } = require('joi')

const createSubcription = async(subcriptionBody) =>{
    return Subcription.create(subcriptionBody)
}


const getSubcriptions = async (filter , options) =>{

  const query = {isDeleted : false, status: "active" };

  for(const key of Object.keys(filter)){
    if(filter[key] !== ''){
        query[key] = {$regex : filter[key] , $option : "i"}
    }
  }
  const limit = parseInt(options.limit) || 10;
  const page = parseInt(options.page) || 1
  const skip = (page -1) * limit
  const sort = options.sortBy ? {[options.sortBy] : 1} : {createdAt : -1}

  const subcriptions = await  Subcription.find(query)
  .sort(sort)
  .skip(skip)
  .limit(limit)

  const total = await Subcription.countDocuments(query)

  return {
    total,
    page,
    limit,
    subcriptions
  }
}

const getSubcriptionById = async(id) =>{
  const subcription = await Subcription.findById(id)
  if (!subcription || subcription.isDeleted) {
    throw new ApiError(httpStatus.NOT_FOUND , "subcription not found")
  }

  return subcription
}

const updateSubcription = async (id , updateBody) =>{
  const subcription = await getSubcriptionById(id)
  Object.assign(subcription , updateBody)
  await subcription.save()
  return subcription;
}

const deleteSubcription = async (id) =>{
  const subcription = await getSubcriptionById(id)
  if(!subcription){
    throw new ApiError(httpStatus.NOT_FOUND , "subcription not found")
  }
  subcription.isDeleted = true;
  subcription.status = "inactive";
  await subcription.save()
  return subcription
}
module.exports ={
    createSubcription ,
     getSubcriptions,
     getSubcriptionById,
     updateSubcription,
     deleteSubcription
}