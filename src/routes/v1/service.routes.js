
const express = require("express");
const { serviceController } = require("../../controllers");
const auth = require("../../middlewares/auth");
const serviceRouter = express.Router();

serviceRouter.post("/create", auth("admin"), serviceController.createService);
serviceRouter.get("/list", auth("common"), serviceController.getAllServices);
serviceRouter.get("/details/:id", auth("common"), serviceController.getServiceById);
serviceRouter.patch("/update/:id", auth("admin"), serviceController.updateService);
serviceRouter.patch("/delete/:id", auth("admin"), serviceController.deleteService);

module.exports = serviceRouter;
