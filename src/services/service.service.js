

const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const {SubCategory } = require("../models");
const Service = require("../models/service.model");

// CREATE
const createServiceIntoDB = async (serviceBody , userId) => {
  const { subCategoryId, name } = serviceBody;

  // Check SubCategory
  const subCategory = await SubCategory.findById(subCategoryId);
  if (!subCategory) throw new ApiError(httpStatus.NOT_FOUND, "SubCategory not found");

  // Check User (createdBy)
//   const user = await User.findById(createdBy);
//   if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");

  const exist = await Service.findOne({ name, subCategoryId });
  if (exist) throw new ApiError(httpStatus.BAD_REQUEST, "Service already exists");

  const service = await Service.create({ ...serviceBody, createdBy: userId });
  return service;
};

// GET ALL
const getAllServicesFromDB = async (filter = {}, options = {}) => {
  const services = await Service.paginate(filter, options);
  return services;
};

// GET BY ID
const getServiceByIdFromDB = async (id) => {
  const service = await Service.findById(id)
    // .populate("subCategoryId createdBy");
  if (!service) throw new ApiError(httpStatus.NOT_FOUND, "Service not found");
  return service;
};

// UPDATE
const updateServiceInDB = async (id, updateBody) => {
  const service = await getServiceByIdFromDB(id);
  Object.assign(service, updateBody);
  await service.save();
  return service;
};

// DELETE (soft delete)
const deleteServiceFromDB = async (id) => {
  const service = await getServiceByIdFromDB(id);
  service.isDeleted = true;
  await service.save();
  return service;
};

module.exports = {
  createServiceIntoDB,
  getAllServicesFromDB,
  getServiceByIdFromDB,
  updateServiceInDB,
  deleteServiceFromDB,
};
