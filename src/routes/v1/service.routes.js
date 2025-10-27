
const express = require("express");
const { serviceController } = require("../../controllers");
const serviceRouter = express.Router();

serviceRouter.post("/create", serviceController.createService);
serviceRouter.get("/list", serviceController.getAllServices);
serviceRouter.get("/details/:id", serviceController.getServiceById);
serviceRouter.patch("/update/:id", serviceController.updateService);
serviceRouter.patch("/delete/:id", serviceController.deleteService);

module.exports = serviceRouter;
