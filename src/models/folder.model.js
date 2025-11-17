const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
      default: null, // null = root folder
    },
    path: {
      type: String,
      required: true, // like /root/work/projects
    },
    size: {
      type: Number,
      default: 0, // folder size = sum of files
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Folder", folderSchema);
