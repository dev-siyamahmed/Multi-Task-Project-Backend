const { folderService } = require("../services");

// Create Folder
exports.createFolder = async (req, res) => {
  try {
    const userId = req.user.id;
    const folder = await folderService.createFolderIntoDB(req.body, userId);

    res.status(201).json({
      success: true,
      message: "Folder created successfully",
      data: folder,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get All Folders (Tree format)
exports.getAllFolders = async (req, res) => {
  try {
    const userId = req.user.id;
    const folders = await folderService.getAllFoldersTreeFromDB(userId);

    res.status(200).json({
      success: true,
      data: folders,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get Folder By ID (Tree format)
exports.getFolderById = async (req, res) => {
  try {
    const userId = req.user.id;
    const folder = await folderService.getFolderTreeByIdFromDB(req.params.id, userId);

    res.status(200).json({
      success: true,
      data: folder,
    });
  } catch (err) {
    res.status(404).json({ success: false, error: err.message });
  }
};

// Update Folder
exports.updateFolder = async (req, res) => {
  try {
    const updated = await folderService.updateFolderIntoDB(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Folder updated successfully",
      data: updated,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Delete Folder
exports.deleteFolder = async (req, res) => {
  try {
    const deleted = await folderService.deleteFolderFromDB(req.params.id);

    res.status(200).json({
      success: true,
      message: "Folder deleted successfully",
      data: deleted,
    });
  } catch (err) {
    res.status(404).json({ success: false, error: err.message });
  }
};
