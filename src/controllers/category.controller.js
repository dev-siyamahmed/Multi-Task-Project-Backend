
const { categoryService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");

const createCategory = async (req, res) => {
  const userId = req.user._id;
  console.log("user id " , userId);
  
  try {
    const category = await categoryService.createCategoryIntoDB(req.body , userId);
    res.status(201).json(category);
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};


const getAllCategories = catchAsync(async (req, res) => {
 const options = pick(req.query, ["limit", "page", "sortBy"]);
  const categories = await categoryService.getAllCategoriesFromDB(options);
  res.status(200).json({
    status: "success",
    message: "Categories retrieved successfully",
    data: categories,
  });
});

const getCategoryById = async (req, res) => {
  try {
    const category = await categoryService.getCategoryByIdFromDB(req.params.id);
    res.json(category);
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await categoryService.updateCategoryInDB(id, req.body);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};


const deleteCategory = async (req, res) => {
  try {
    await categoryService.deleteCategoryFromDB(req.params.id);
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
