const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Job = require("../models/jobModel");

// CREATE JOB (client)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, budget, location } = req.body;

    const job = await Job.create({
      title,
      description,
      budget,
      location,
      client: req.user.id,
      status: "open",
    });

    res.status(201).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Job creation failed" });
  }
});

// GET ALL JOBS
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("client", "name")
      .populate("assignedWorker", "name");

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
});

// ASSIGN WORKER TO JOB
router.put("/:jobId/assign", authMiddleware, async (req, res) => {
  try {
    const { workerId } = req.body;

    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Only job owner can assign
    if (job.client.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    job.assignedWorker = workerId;
    job.status = "in_progress";
    await job.save();

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: "Assignment failed" });
  }
});

// MARK JOB AS COMPLETED
router.put("/:jobId/complete", authMiddleware, async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    job.status = "completed";
    await job.save();

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: "Completion failed" });
  }
});

module.exports = router;

