


const express = require("express");
const auth = require("../../middlewares/auth");
const { folderController } = require("../../controllers");
const folderRouter = express.Router();

folderRouter.post("/create", auth("common"), folderController.createFolder);
folderRouter.get("/list", auth("common"), folderController.getAllFolders);
folderRouter.get("/details/:id", auth("common"), folderController.getFolderById);
folderRouter.patch("/update/:id", auth("common"), folderController.updateFolder);
folderRouter.delete("/delete/:id", auth("common"), folderController.deleteFolder);

module.exports = folderRouter;