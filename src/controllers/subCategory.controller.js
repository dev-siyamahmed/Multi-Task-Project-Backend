
const { subCategoryService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");

// CREATE
const createSubCategory = catchAsync(async (req, res) => {
  const userId = req.user._id;
  console.log("user id ", userId);
  const subCategory = await subCategoryService.createSubCategoryIntoDB(req.body, userId);
  res.status(201).json({
    success: true,
    message: "SubCategory created successfully",
    data: subCategory,
  });
});

// GET ALL
const getAllSubCategories = catchAsync(async (req, res) => {
  const options = pick(req.query, ["limit", "page", "sortBy", "populate"]);
  const filter = {};
  const subCategories = await subCategoryService.getAllSubCategoriesFromDB(filter, options);
  res.status(200).json({
    success: true,
    message: "SubCategories retrieved successfully",
    data: subCategories,
  });
});

// GET BY ID
const getSubCategoryById = catchAsync(async (req, res) => {
  const subCategory = await subCategoryService.getSubCategoryByIdFromDB(req.params.id);
  res.status(200).json({
    success: true,
    data: subCategory,
  });
});

// UPDATE
const updateSubCategory = catchAsync(async (req, res) => {
  const subCategory = await subCategoryService.updateSubCategoryInDB(req.params.id, req.body);
  res.status(200).json({
    success: true,
    message: "SubCategory updated successfully",
    data: subCategory,
  });
});

// DELETE
const deleteSubCategory = catchAsync(async (req, res) => {
  await subCategoryService.deleteSubCategoryFromDB(req.params.id);
  res.status(200).json({
    success: true,
    message: "SubCategory deleted successfully",
  });
});

module.exports = {
  createSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
};
