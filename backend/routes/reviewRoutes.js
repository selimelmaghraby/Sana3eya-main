const express = require("express");
const router = express.Router();
const Review = require("../models/reviewModel");
const Job = require("../models/jobModel");
const authMiddleware = require("../middleware/authMiddleware");

// ==============================
// CREATE REVIEW
// ==============================
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { jobId, rating, comment } = req.body;

    if (!jobId || !rating) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // Find job
    const job = await Job.findById(jobId).populate("client");
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Determine reviewee
    const reviewee = job.client._id;

    const review = await Review.create({
      reviewer: req.user.id,
      reviewee: reviewee,
      job: jobId,
      rating,
      comment,
    });

    res.json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to submit review" });
  }
});

// ==============================
// GET ALL REVIEWS
// ==============================
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("reviewer", "name")
      .populate("reviewee", "name")
      .populate("job", "title");

    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
});

module.exports = router;



