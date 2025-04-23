const Review = require("../models/ReviewSchema");

// @desc    Add a new review
// @route   POST /review/add
exports.addReview = async (req, res) => {
  try {
    const { title, description, videoUrl } = req.body;
    const video = req.file ? `/uploads/${req.file.filename}` : videoUrl;

    if (!title || !description || !video) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newReview = new Review({
      title,
      description,
      video,
    });

    const savedReview = await newReview.save();
    res.status(201).json({ message: "Review added successfully", review: savedReview });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ error: "Failed to add review" });
  }
};

// @desc    Get all reviews
// @route   GET /review/all
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};

// @desc    Delete a review by ID
// @route   DELETE /review/delete/:id
exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReview = await Review.findByIdAndDelete(id);

    if (!deletedReview) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ error: "Failed to delete review" });
  }
};