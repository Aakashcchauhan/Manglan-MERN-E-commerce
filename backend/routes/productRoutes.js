const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  getProductsByTag,
  getProductById
} = require('../controllers/productController');

// Multer config for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"), // Ensure this path exists
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)), // Generate unique filenames
});
const upload = multer({ storage });

// Route to upload and add product
router.post("/add", upload.single("image"), addProduct);

// Route to get all products
router.get('/all', getProducts);

// Route to delete product by ID
router.delete('/delete/:id', deleteProduct);
router.get('/:id', getProductById);

// Route to update product by ID
router.put('/update/:id', upload.single("image"), updateProduct);
router.get('/tag/:tag', getProductsByTag);


module.exports = router;
