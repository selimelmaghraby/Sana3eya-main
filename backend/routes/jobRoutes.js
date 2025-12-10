const express = require('express');
const Job = require('../models/jobModel');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * POST /api/jobs
 * Client posts a job
 */
router.post('/', protect, async (req, res) => {
  try {
    const { title, description, budget, location, skillsRequired } = req.body;

    if (!title || !budget) {
      return res.status(400).json({ message: 'Title and budget are required' });
    }

    const job = new Job({
      title,
      description,
      budget,
      location,
      skillsRequired,
      client: req.user._id,
    });

    await job.save();
    res.status(201).json(job);
  } catch (err) {
    console.error('Create job error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * GET /api/jobs
 * Get all jobs (optionally filter by skills/location)
 */
router.get('/', async (req, res) => {
  try {
    const { skills, location } = req.query;

    let query = {};

    if (skills) {
      query.skillsRequired = { $in: skills.split(',') };
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    const jobs = await Job.find(query).populate('client', 'name').populate('assignedWorker', 'name');
    res.json(jobs);
  } catch (err) {
    console.error('Get jobs error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * POST /api/jobs/:id/apply
 * Worker applies to a job
 */
router.post('/:id/apply', protect, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const alreadyApplied = job.applicants.includes(req.user._id);

    if (alreadyApplied) {
      return res.status(400).json({ message: 'You already applied to this job' });
    }

    job.applicants.push(req.user._id);
    await job.save();

    res.json({ message: 'Applied successfully', job });
  } catch (err) {
    console.error('Apply job error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * PATCH /api/jobs/:id/match
 * Automatically match a worker to the job based on skills
 */
router.patch('/:id/match', protect, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const worker = await User.findOne({
      skills: { $in: job.skillsRequired }, // Match based on skills
    });

    if (!worker) {
      return res.status(404).json({ message: 'No worker found with the required skills' });
    }

    job.assignedWorker = worker._id;
    job.status = 'in_progress'; // Update job status

    await job.save();

    res.json({ message: 'Worker assigned successfully', job });
  } catch (err) {
    console.error('Match job error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;