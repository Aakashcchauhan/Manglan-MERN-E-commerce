const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  addReview,
  getAllReviews,
  deleteReview,
} = require("../controllers/ReviewController");

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"), // Ensure this path exists
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)), // Generate unique filenames
});
const upload = multer({ storage });

// Routes
router.post("/add", upload.single("video"), addReview); // Add a review with video
router.get("/all", getAllReviews); // Get all reviews
router.delete("/delete/:id", deleteReview); // Delete a review by ID

module.exports = router;