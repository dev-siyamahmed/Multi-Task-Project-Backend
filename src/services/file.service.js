

const { Folder, File, } = require("../models");
const { decreaseStorage, increaseStorage } = require("../utils/decreaseStorage");
const fs = require("fs");
const path = require("path");

// Single file upload
const createFileIntoDB = async (data, file, userId) => {
  const { folderId } = data;

  const folder = await Folder.findById(folderId);
  if (!folder) throw new Error("Folder not found");

  const fileSize = file.size / (1024 * 1024); // bytes → MB

  // Check if user has enough storage
  await decreaseStorage(userId, fileSize);

  const uploadedFile = await File.create({
    name: file.originalname,
    fileUrl: "/uploads/" + file.filename,
    type: file.mimetype,
    size: fileSize,
    folder: folderId,
    user: userId,
  });

  // Update folder size
  folder.size += fileSize;
  await folder.save();

  return uploadedFile;
};

// Multiple files upload
const createMultipleFilesIntoDB = async (data, files, userId) => {
  const { folderId } = data;

  const folder = await Folder.findById(folderId);
  if (!folder) throw new Error("Folder not found");

  // Calculate total size of all files
  let totalSize = 0;
  files.forEach((file) => {
    totalSize += file.size / (1024 * 1024); // bytes → MB
  });

  // Check if user has enough storage for all files
  await decreaseStorage(userId, totalSize);

  // Upload all files
  const uploadedFiles = [];
  for (const file of files) {
    const fileSize = file.size / (1024 * 1024); // bytes → MB

    const uploadedFile = await File.create({
      name: file.originalname,
      fileUrl: "/uploads/" + file.filename,
      type: file.mimetype,
      size: fileSize,
      folder: folderId,
      user: userId,
    });

    uploadedFiles.push(uploadedFile);
  }

  // Update folder size with total size
  folder.size += totalSize;
  await folder.save();

  return uploadedFiles;
};


// List all files
const getAllFilesFromDB = async (userId) => {
  return await File.find({ user: userId }).sort({ createdAt: -1 });
};

// Get file by ID
const getFileByIdFromDB = async (id, userId) => {
  const file = await File.findOne({ _id: id, user: userId });
  if (!file) throw new Error("File not found");
  return file;
};

// Update file info
const updateFileIntoDB = async (id, data) => {
  const updated = await File.findByIdAndUpdate(id, data, { new: true });
  if (!updated) throw new Error("File update failed");
  return updated;
};


// Delete file
const deleteFileFromDB = async (id, userId) => {
  const file = await File.findOne({ _id: id, user: userId });
  if (!file) throw new Error("File not found");

  const fileSize = file.size;

  // Return storage to user
  await increaseStorage(userId, fileSize);

  // Decrease folder size
  const folder = await Folder.findById(file.folder);
  if (folder) {
    folder.size -= fileSize;
    await folder.save();
  }

  // 🔥 DELETE FILE FROM SERVER
  const filePath = path.join(__dirname, "..", "public", file.fileUrl);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath); // remove file
  }

  // Delete from DB
  await File.findByIdAndDelete(id);

  return file;
};


function detectFileType(mime) {
  if (mime.startsWith("image/")) return "image";
  if (mime === "application/pdf") return "pdf";
  if (mime.startsWith("video/")) return "video";
  if (mime.startsWith("audio/")) return "audio";
  return "other";
}

const getStorageUsageFromDB = async (userId) => {
  const files = await File.find({ user: userId });

  let totalUsedMB = 0;
  const typeStats = {};

  files.forEach(file => {
    const type = detectFileType(file.type);
    const size = file.size; // MB

    totalUsedMB += size;

    if (!typeStats[type]) {
      typeStats[type] = {
        count: 0,
        usedMB: 0,
      };
    }

    typeStats[type].count += 1;
    typeStats[type].usedMB += size;
  });

  // Convert values
  for (const key in typeStats) {
    typeStats[key].usedGB = Number((typeStats[key].usedMB / 1024).toFixed(2));
    typeStats[key].usedMB = Number(typeStats[key].usedMB.toFixed(2));
  }

  return {
    totalUsedMB: Number(totalUsedMB.toFixed(2)),
    totalUsedGB: Number((totalUsedMB / 1024).toFixed(2)),
    byType: typeStats,
  };
};



module.exports = {
  createFileIntoDB,
  createMultipleFilesIntoDB,
  getAllFilesFromDB,
  getFileByIdFromDB,
  updateFileIntoDB,
  deleteFileFromDB,
  getStorageUsageFromDB,
};