const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { SubCategory, Category } = require("../models");

// CREATE
const createSubCategoryIntoDB = async (subCategoryBody, userId) => {
  const { categoryId, name } = subCategoryBody;

  // Check if Category exists
  const category = await Category.findById(categoryId);
  if (!category) throw new ApiError(httpStatus.NOT_FOUND, "Category not found");

  // Check if SubCategory with same name exists
  const exist = await SubCategory.findOne({ name });
  if (exist) throw new ApiError(httpStatus.BAD_REQUEST, "SubCategory already exists");

  const subCategory = await SubCategory.create({ ...subCategoryBody, createdBy: userId });
  return subCategory;
};

// GET ALL (with pagination)
const getAllSubCategoriesFromDB = async (filter = {}, options = {}) => {
  const query = { isDeleted: false, ...filter };
  const subCategories = await SubCategory.paginate(query, options);
  return subCategories;
};

// GET BY ID
const getSubCategoryByIdFromDB = async (id) => {
  const subCategory = await SubCategory.findById(id).populate("categoryId createdBy");
  if (!subCategory) throw new ApiError(httpStatus.NOT_FOUND, "SubCategory not found");
  return subCategory;
};

// UPDATE
const updateSubCategoryInDB = async (id, updateBody) => {
  const subCategory = await getSubCategoryByIdFromDB(id);
  Object.assign(subCategory, updateBody);
  await subCategory.save();
  return subCategory;
};

// DELETE (soft delete)
const deleteSubCategoryFromDB = async (id) => {
  const subCategory = await getSubCategoryByIdFromDB(id);
  subCategory.isDeleted = true;
  await subCategory.save();
  return subCategory;
};

module.exports = {
  createSubCategoryIntoDB,
  getAllSubCategoriesFromDB,
  getSubCategoryByIdFromDB,
  updateSubCategoryInDB,
  deleteSubCategoryFromDB,
};
