const express = require("express");
const router = express.Router();
const Review = require("../models/reviewModel");
const authMiddleware = require("../middleware/authMiddleware");

// CREATE REVIEW (Milestone 3 safe logic)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { reviewee, job, rating, comment } = req.body;

    if (!reviewee || !job || !rating) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const review = await Review.create({
      reviewer: req.user.id,
      reviewee,
      job,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Review failed" });
  }
});

// GET ALL REVIEWS
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("reviewer", "name")
      .populate("reviewee", "name");

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
});

module.exports = router;


