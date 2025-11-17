
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true, // MIME type (image/jpeg, application/pdf, etc.)
    },
    size: {
      type: Number,
      required: true, // Size in MB
    },
    folder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Virtual for size in KB
fileSchema.virtual('sizeKB').get(function() {
  return (this.size * 1024).toFixed(2);
});

// Virtual for size in GB
fileSchema.virtual('sizeGB').get(function() {
  return (this.size / 1024).toFixed(2);
});

// Virtual for human readable size
fileSchema.virtual('sizeFormatted').get(function() {
  if (this.size < 1) {
    return `${(this.size * 1024).toFixed(2)} KB`;
  } else if (this.size < 1024) {
    return `${this.size.toFixed(2)} MB`;
  } else {
    return `${(this.size / 1024).toFixed(2)} GB`;
  }
});

fileSchema.set('toJSON', { virtuals: true });
fileSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model("File", fileSchema);