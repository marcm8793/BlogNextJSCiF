import multer from "multer";

export const featuredImageUpload = multer({
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter(req, file, callback) {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      callback(null, true);
    } else {
      callback(new Error("Unaccepted file type"));
    }
  },
});
