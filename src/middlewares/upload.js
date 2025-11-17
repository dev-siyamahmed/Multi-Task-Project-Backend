
const multer = require("multer");
const path = require("path");

const UPLOADS_FOLDER = "src/public/uploads/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_FOLDER);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name =
      file.originalname.replace(ext, "").toLowerCase().split(" ").join("-") +
      "-" +
      Date.now();

    cb(null, name + ext);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB per file
  fileFilter: (req, file, cb) => {
    // Accept any file type
    cb(null, true);
    
    // If you want to restrict specific types, uncomment below:
    // const allowed = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
    // if (allowed.includes(file.mimetype)) cb(null, true);
    // else cb(new Error("File type not allowed!"));
  },
});

module.exports = upload;