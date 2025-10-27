
const { serviceService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");

// CREATE
const createService = catchAsync(async (req, res) => {
  const userId = req.user._id;
  console.log("user id ", userId);
  const service = await serviceService.createServiceIntoDB(req.body, userId);
  res.status(201).json({
    success: true,
    message: "Service created successfully",
    data: service,
  });
});

// GET ALL
const getAllServices = catchAsync(async (req, res) => {
 const options = pick(req.query, ["limit", "page", "sortBy", "populate"]);
  const filter = { isDeleted: false };
  const services = await serviceService.getAllServicesFromDB(filter, options);
  res.status(200).json({
    success: true,
    message: "Services retrieved successfully",
    data: services,
  });
});

// GET BY ID
const getServiceById = catchAsync(async (req, res) => {
  const service = await serviceService.getServiceByIdFromDB(req.params.id);
  res.status(200).json({
    success: true,
    data: service,
  });
});

// UPDATE
const updateService = catchAsync(async (req, res) => {
  const service = await serviceService.updateServiceInDB(req.params.id, req.body);
  res.status(200).json({
    success: true,
    message: "Service updated successfully",
    data: service,
  });
});

// DELETE
const deleteService = catchAsync(async (req, res) => {
  await serviceService.deleteServiceFromDB(req.params.id);
  res.status(200).json({
    success: true,
    message: "Service deleted successfully",
  });
});

module.exports = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
};
