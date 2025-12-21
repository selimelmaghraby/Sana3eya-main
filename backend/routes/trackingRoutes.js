const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const ProjectTracking = require("../models/projectTrackingModel");
const Job = require("../models/jobModel");

router.post("/:jobId", authMiddleware, async (req, res) => {
  const { progress } = req.body;
  const job = await Job.findById(req.params.jobId);
  if (!job) return res.status(404).json({ message: "Job not found" });

  let tracking = await ProjectTracking.findOne({ job: job._id });
  if (!tracking) {
    tracking = await ProjectTracking.create({
      job: job._id,
      progress,
      lastUpdatedBy: req.user.id,
    });
  } else {
    tracking.progress = progress;
    tracking.lastUpdatedBy = req.user.id;
    await tracking.save();
  }

  res.json(tracking);
});

router.get("/:jobId", authMiddleware, async (req, res) => {
  const tracking = await ProjectTracking.findOne({
    job: req.params.jobId,
  });
  if (!tracking) return res.status(404).json({ message: "Not found" });
  res.json(tracking);
});

module.exports = router;


