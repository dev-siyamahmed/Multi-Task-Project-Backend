


const express = require("express");
const auth = require("../../middlewares/auth");
const { folderController } = require("../../controllers");
const folderRouter = express.Router();

folderRouter.post("/create", auth("common"), folderController.createFolder);
folderRouter.get("/list", auth("common"), folderController.getAllFolders);
folderRouter.get("/details/:id", auth("common"), folderController.getFolderById);
folderRouter.patch("/update/:id", auth("admin"), folderController.updateFolder);
folderRouter.delete("/delete/:id", auth("admin"), folderController.deleteFolder);

module.exports = folderRouter;