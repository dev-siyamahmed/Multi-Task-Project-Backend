const express = require("express");
const auth = require("../../middlewares/auth");
const { fileController } = require("../../controllers");
const upload = require("../../middlewares/upload");

const fileRouter = express.Router();

// Single file upload
fileRouter.post(
  "/create",
  auth("common"),
  upload.single("file"),
  fileController.createFile
);

// Multiple files upload
fileRouter.post(
  "/create-multiple",
  auth("common"),
  upload.array("files", 10), // max 10 files
  fileController.createMultipleFiles
);

fileRouter.get("/list", auth("common"), fileController.getAllFiles);
fileRouter.get("/details/:id", auth("common"), fileController.getFileById);
fileRouter.patch("/update/:id", auth("common"), fileController.updateFile);
fileRouter.delete("/delete/:id", auth("common"), fileController.deleteFile);

fileRouter.get("/storage-usage", auth("common"), fileController.getStorageUsage);

module.exports = fileRouter;