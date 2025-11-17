



const { Folder, File } = require("../models");
const { increaseStorage } = require("../utils/decreaseStorage");

// CREATE FOLDER

const createFolderIntoDB = async (data, userId) => {
  const { name, parent } = data;

  // path generate
  let path = "/";

  if (parent) {
    const parentFolder = await Folder.findById(parent);
    if (!parentFolder) throw new Error("Parent folder not found");

    path = `${parentFolder.path}/${name}`;
  } else {
    path = `/${name}`;
  }

  // Folder itself doesn't consume storage, only files do
  const folder = await Folder.create({
    name,
    parent: parent || null,
    path,
    user: userId,
    size: 0, // Initial size is 0, will increase when files are added
  });

  return folder;
};




// GET ALL FOLDERS (TREE FORMAT) WITH FILES
const getAllFoldersTreeFromDB = async (userId) => {
  const rootFolders = await Folder.find({ parent: null, user: userId });

  const buildTree = async (folder) => {
    // Get child folders
    const children = await Folder.find({ parent: folder._id, user: userId });

    // Get files in this folder
    const files = await File.find({ folder: folder._id, user: userId }).sort({ createdAt: -1 });

    return {
      ...folder.toObject(),
      files, // attach files array
      children: await Promise.all(children.map((child) => buildTree(child))),
    };
  };

  const finalTree = await Promise.all(rootFolders.map((f) => buildTree(f)));
  return finalTree;
};




// GET FOLDER BY ID WITH ALL NESTED CHILDREN TREE
const getFolderTreeByIdFromDB = async (folderId, userId) => {
  const folder = await Folder.findOne({ _id: folderId, user: userId });

  if (!folder) throw new Error("Folder not found");

  const buildTree = async (folder) => {
    const children = await Folder.find({ parent: folder._id, user: userId });
    const files = await File.find({ folder: folder._id, user: userId });

    return {
      ...folder.toObject(),
      files: files,
      children: await Promise.all(children.map((child) => buildTree(child))),
    };
  };

  return await buildTree(folder);
};

// UPDATE FOLDER
const updateFolderIntoDB = async (folderId, data) => {
  const updated = await Folder.findByIdAndUpdate(folderId, data, { new: true });

  if (!updated) throw new Error("Folder not found or update failed");
  return updated;
};

// DELETE FOLDER (with all nested files and subfolders)
const deleteFolderFromDB = async (folderId, userId) => {
  const folder = await Folder.findOne({ _id: folderId, user: userId });
  if (!folder) throw new Error("Folder not found or already deleted");

  // Recursive function to delete all nested folders and files
  const deleteRecursive = async (folderId) => {
    // Find all files in this folder
    const files = await File.find({ folder: folderId });
    
    // Calculate total size of files and return storage to user
    let totalFileSize = 0;
    for (const file of files) {
      totalFileSize += file.size;
    }
    
    if (totalFileSize > 0) {
      await increaseStorage(userId, totalFileSize);
    }

    // Delete all files in this folder
    await File.deleteMany({ folder: folderId });

    // Find all subfolders
    const subfolders = await Folder.find({ parent: folderId });

    // Recursively delete all subfolders
    for (const subfolder of subfolders) {
      await deleteRecursive(subfolder._id);
    }

    // Delete the folder itself
    await Folder.findByIdAndDelete(folderId);
  };

  await deleteRecursive(folderId);

  return folder;
};

module.exports = {
  createFolderIntoDB,
  getAllFoldersTreeFromDB,
  getFolderTreeByIdFromDB,
  updateFolderIntoDB,
  deleteFolderFromDB,
};