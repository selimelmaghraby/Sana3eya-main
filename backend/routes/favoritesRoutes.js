const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Favorite = require("../models/favoriteModel");

// ADD TO FAVORITES
router.post("/:jobId", authMiddleware, async (req, res) => {
  try {
    const exists = await Favorite.findOne({
      user: req.user.id,
      job: req.params.jobId,
    });

    if (exists) {
      return res.status(400).json({ message: "Already in favorites" });
    }

    const favorite = await Favorite.create({
      user: req.user.id,
      job: req.params.jobId,
    });

    res.json(favorite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add favorite" });
  }
});

// GET FAVORITES
router.get("/", authMiddleware, async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user.id }).populate("job");
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch favorites" });
  }
});

// REMOVE FAVORITE
router.delete("/:jobId", authMiddleware, async (req, res) => {
  await Favorite.findOneAndDelete({
    user: req.user.id,
    job: req.params.jobId,
  });
  res.json({ message: "Favorite removed" });
});

module.exports = router;
