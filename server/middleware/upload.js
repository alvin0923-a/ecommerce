const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `product-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

// File filter - allow only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const isValidExt = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const isValidMime = allowedTypes.test(file.mimetype);

  if (isValidExt && isValidMime) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter,
});

module.exports = upload;
