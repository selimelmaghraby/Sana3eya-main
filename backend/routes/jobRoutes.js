const express = require("express");
const router = express.Router();
const Job = require("../models/jobModel");
const authMiddleware = require("../middleware/authMiddleware");

// CREATE JOB
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, budget } = req.body;

    if (!title || !description || !budget) {
      return res.status(400).json({ message: "All fields required" });
    }

    const job = await Job.create({
      title,
      description,
      budget,
      client: req.user.id,
      status: "open",
    });

    res.status(201).json({ job });
  } catch (err) {
    console.error("CREATE JOB ERROR:", err);
    res.status(500).json({ message: "Failed to create job" });
  }
});

// GET ALL JOBS
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
});

module.exports = router;


