const express = require('express');
const { subCategoryController } = require('../../controllers');
const auth = require('../../middlewares/auth');


const subCategoryRouter = express.Router();

    subCategoryRouter.post("/create", auth('admin'), subCategoryController.createSubCategory);
    subCategoryRouter.get("/list", auth('common'), subCategoryController.getAllSubCategories);
    subCategoryRouter.get("/details/:id", auth('common'), subCategoryController.getSubCategoryById);
    subCategoryRouter.patch("/update/:id", auth('admin'), subCategoryController.updateSubCategory);
    subCategoryRouter.patch("/delete/:id", auth('admin'), subCategoryController.deleteSubCategory);

module.exports = subCategoryRouter;
