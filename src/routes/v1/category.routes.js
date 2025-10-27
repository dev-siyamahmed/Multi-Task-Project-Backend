

const express = require('express');
const { categoryController } = require('../../controllers');
const auth = require('../../middlewares/auth');

const categoryRouter = express.Router();

categoryRouter.post("/create", auth('admin'), categoryController.createCategory);
categoryRouter.get("/list", auth('common'), categoryController.getAllCategories);
categoryRouter.get("/details/:id", auth('common'), categoryController.getCategoryById);
categoryRouter.patch("/update/:id", auth('admin'), categoryController.updateCategory);
categoryRouter.patch("/delete/:id", auth('admin'), categoryController.deleteCategory);

module.exports = categoryRouter;
