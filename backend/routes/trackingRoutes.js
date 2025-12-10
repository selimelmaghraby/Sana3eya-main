const express = require('express');
const ProjectTracking = require('../models/projectTrackingModel');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * POST /api/tracking
 * Create tracking entry for a job
 * Body example:
 * {
 *   "job": "665e8c2f7b6f5c0012345678",
 *   "milestones": [
 *     { "title": "Site visit" },
 *     { "title": "Buy materials" },
 *     { "title": "Finish work" }
 *   ]
 * }
 */
router.post('/', protect, async (req, res) => {
  try {
    const { job, milestones } = req.body;

    if (!job) {
      return res.status(400).json({ message: 'Job ID is required' });
    }

    const tracking = await ProjectTracking.create({
      job,
      milestones: milestones || [],
      progress: 0,
    });

    res.status(201).json(tracking);
  } catch (err) {
    console.error('Create tracking error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * GET /api/tracking/job/:jobId
 * Get tracking info for a specific job
 */
router.get('/job/:jobId', async (req, res) => {
  try {
    const { jobId } = req.params;

    const tracking = await ProjectTracking.findOne({ job: jobId });

    if (!tracking) {
      return res.status(404).json({ message: 'Tracking not found for this job' });
    }

    res.json(tracking);
  } catch (err) {
    console.error('Get tracking error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * PATCH /api/tracking/job/:jobId
 * Update progress and/or milestones
 * Body example:
 * {
 *   "progress": 60,
 *   "milestones": [
 *     { "title": "Site visit", "completed": true },
 *     { "title": "Buy materials", "completed": true },
 *     { "title": "Finish work", "completed": false }
 *   ]
 * }
 */
router.patch('/job/:jobId', protect, async (req, res) => {
  try {
    const { jobId } = req.params;
    const { progress, milestones } = req.body;

    const tracking = await ProjectTracking.findOne({ job: jobId });

    if (!tracking) {
      return res.status(404).json({ message: 'Tracking not found for this job' });
    }

    if (typeof progress === 'number') {
      tracking.progress = progress;
    }

    if (Array.isArray(milestones)) {
      tracking.milestones = milestones.map((m) => ({
        title: m.title,
        completed: !!m.completed,
        completionDate: m.completed ? (m.completionDate || new Date()) : null,
      }));
    }

    tracking.lastUpdated = new Date();

    await tracking.save();

    res.json(tracking);
  } catch (err) {
    console.error('Update tracking error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
