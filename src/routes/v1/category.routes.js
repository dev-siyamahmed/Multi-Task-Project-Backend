

const express = require('express');
const { categoryController } = require('../../controllers');

const categoryRouter = express.Router();

categoryRouter.post("/create", categoryController.createCategory);
categoryRouter.get("/list", categoryController.getAllCategories);
categoryRouter.get("/details/:id", categoryController.getCategoryById);
categoryRouter.patch("/update/:id", categoryController.updateCategory);
categoryRouter.patch("/delete/:id", categoryController.deleteCategory);

module.exports = categoryRouter;
