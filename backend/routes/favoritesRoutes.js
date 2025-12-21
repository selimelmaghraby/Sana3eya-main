const express = require('express');
const Favorite = require('../models/favoriteModel');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * POST /api/favorites/saveJob
 * Save a job to the user's favorites
 */
router.post('/saveJob', protect, async (req, res) => {
  try {
    const { jobId } = req.body;

    if (!jobId) {
      return res.status(400).json({ message: 'Job ID is required' });
    }

    let favorites = await Favorites.findOne({ user: req.user._id });

    if (!favorites) {
      favorites = new Favorites({ user: req.user._id });
    }

    if (!favorites.savedJobs.includes(jobId)) {
      favorites.savedJobs.push(jobId);
    }

    await favorites.save();

    res.status(201).json(favorites);
  } catch (err) {
    console.error('Save job error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * POST /api/favorites/saveWorker
 * Save a worker to the user's favorites
 */
router.post('/saveWorker', protect, async (req, res) => {
  try {
    const { workerId } = req.body;

    if (!workerId) {
      return res.status(400).json({ message: 'Worker ID is required' });
    }

    let favorites = await Favorites.findOne({ user: req.user._id });

    if (!favorites) {
      favorites = new Favorites({ user: req.user._id });
    }

    if (!favorites.savedWorkers.includes(workerId)) {
      favorites.savedWorkers.push(workerId);
    }

    await favorites.save();

    res.status(201).json(favorites);
  } catch (err) {
    console.error('Save worker error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * GET /api/favorites
 * Get the user's saved jobs and workers
 */
router.get('/', protect, async (req, res) => {
  try {
    const favorites = await Favorites.findOne({ user: req.user._id })
      .populate('savedJobs')
      .populate('savedWorkers');

    if (!favorites) {
      return res.status(404).json({ message: 'Favorites not found' });
    }

    res.json(favorites);
  } catch (err) {
    console.error('Get favorites error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;