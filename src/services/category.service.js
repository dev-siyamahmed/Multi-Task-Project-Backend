const httpStatus = require("http-status"); // optional utility (you can replace with Error)
const { Category, SubCategory } = require("../models");
const ApiError = require("../utils/ApiError");
const Service = require("../models/service.model");

// Create Category
const createCategoryIntoDB = async (categoryBody) => {
  const exist = await Category.findOne({ name: categoryBody.name });
  if (exist) throw new ApiError(httpStatus.BAD_REQUEST, "Category already exists");

  const category = await Category.create(categoryBody);
  return category;
};

// Get All Categories (with pagination)
const getAllCategoriesFromDB = async (options = {}) => {
  const query = { isDeleted: false };
  const categories = await Category.paginate(query, options);

  const populatedResults = await Promise.all(
    categories.results.map(async (category) => {
      // get SubCategories
      const subCategories = await SubCategory.find({ categoryId: category._id, isDeleted: false });

      const populatedSubCategories = await Promise.all(
        subCategories.map(async (sub) => {
          const services = await Service.find({ subCategoryId: sub._id, isDeleted: false });
          return {
            ...sub.toObject(),
            services,
          };
        })
      );

      return {
        ...category.toObject(),
        subCategories: populatedSubCategories,
      };
    })
  );

  return {
    ...categories,
    results: populatedResults,
  };
};

// Get Category by ID
// GET CATEGORY BY ID WITH SUBCATEGORIES & SERVICES
const getCategoryByIdFromDB = async (id) => {
  const category = await Category.findById(id);
  if (!category) throw new ApiError(httpStatus.NOT_FOUND, "Category not found");

  // get SubCategories
  const subCategories = await SubCategory.find({ categoryId: category._id, isDeleted: false });

  const populatedSubCategories = await Promise.all(
    subCategories.map(async (sub) => {
      const services = await Service.find({ subCategoryId: sub._id, isDeleted: false });
      return {
        ...sub.toObject(),
        services,
      };
    })
  );

  return {
    ...category.toObject(),
    subCategories: populatedSubCategories,
  };
};



// Update Category
const updateCategoryInDB = async (id, updateData) => {
  const category = await Category.findByIdAndUpdate(id, updateData, { new: true });
  if (!category) {
    const err = new Error("Category not found");
    err.statusCode = 404;
    throw err;
  }

  return category;
};

// Delete Category
const deleteCategoryFromDB = async (categoryId) => {
  const category = await getCategoryByIdFromDB(categoryId); // correct function
  category.isDeleted = true; // soft delete
  await category.save();
  return category;
};

module.exports = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
  getCategoryByIdFromDB,
  updateCategoryInDB,
  deleteCategoryFromDB,
};
