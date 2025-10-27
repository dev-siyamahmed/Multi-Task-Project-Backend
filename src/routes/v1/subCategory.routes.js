const express = require('express');
const { subCategoryController } = require('../../controllers');


const subCategoryRouter = express.Router();

    subCategoryRouter.post("/create",subCategoryController.createSubCategory);
    subCategoryRouter.get("/list", subCategoryController.getAllSubCategories);
    subCategoryRouter.get("/details/:id", subCategoryController.getSubCategoryById);
    subCategoryRouter.patch("/update/:id", subCategoryController.updateSubCategory);
    subCategoryRouter.patch("/delete/:id", subCategoryController.deleteSubCategory);

module.exports = subCategoryRouter;
