const express = require("express");
const router = express.Router();
const Favorite = require("../models/favoriteModel");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/:jobId", authMiddleware, async (req, res) => {
  const favorite = await Favorite.create({
    user: req.user.id,
    job: req.params.jobId,
  });
  res.status(201).json(favorite);
});

router.get("/", authMiddleware, async (req, res) => {
  const favorites = await Favorite.find({ user: req.user.id }).populate("job");
  res.json(favorites);
});

router.delete("/:jobId", authMiddleware, async (req, res) => {
  await Favorite.findOneAndDelete({
    user: req.user.id,
    job: req.params.jobId,
  });
  res.json({ message: "Favorite removed" });
});

module.exports = router;

