
const { fileService } = require("../services");



// Single file upload
createFile = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "File is required" });
    }

    const file = await fileService.createFileIntoDB(req.body, req.file, userId);

    res.status(201).json({
      success: true,
      message: "File uploaded successfully",
      data: file,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Multiple files upload
createMultipleFiles = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "Files are required" });
    }

    const uploadedFiles = await fileService.createMultipleFilesIntoDB(
      req.body,
      req.files,
      userId
    );

    res.status(201).json({
      success: true,
      message: `${uploadedFiles.length} files uploaded successfully`,
      data: uploadedFiles,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

getAllFiles = async (req, res) => {
  try {
    const files = await fileService.getAllFilesFromDB(req.user.id);
    res.status(200).json({ success: true, data: files });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

getFileById = async (req, res) => {
  try {
    const file = await fileService.getFileByIdFromDB(req.params.id, req.user.id);
    res.status(200).json({ success: true, data: file });
  } catch (err) {
    res.status(404).json({ success: false, error: err.message });
  }
};

updateFile = async (req, res) => {
  try {
    const updated = await fileService.updateFileIntoDB(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "File updated successfully",
      data: updated,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

deleteFile = async (req, res) => {
  try {
    const deleted = await fileService.deleteFileFromDB(req.params.id, req.user.id);
    res.status(200).json({
      success: true,
      message: "File deleted successfully",
      data: deleted,
    });
  } catch (err) {
    res.status(404).json({ success: false, error: err.message });
  }
};





const getStorageUsage = async (req, res) => {
  try {
    const usage = await fileService.getStorageUsageFromDB(req.user.id);

    res.status(200).json({
      success: true,
      message: "Storage usage fetched successfully",
      data: usage,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};



module.exports = {
  createFile,
  createMultipleFiles,
  getAllFiles,
  getFileById,
  updateFile,
  deleteFile,
  getStorageUsage,
};