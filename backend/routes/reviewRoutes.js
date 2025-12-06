const express = require('express');
const Review = require('../models/reviewModel');

const router = express.Router();

// POST /api/reviews
router.post('/', async (req, res) => {
  try {
    const { reviewer, reviewee, job, rating, comment } = req.body;

    if (!reviewer || !reviewee || !job || !rating) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const review = await Review.create({
      reviewer,
      reviewee,
      job,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/reviews/user/:userId
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const reviews = await Review.find({ reviewee: userId })
      .populate('reviewer', 'name')
      .populate('job', 'title');

    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/reviews/reviewer/:userId
router.get('/reviewer/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const reviews = await Review.find({ reviewer: userId })
      .populate('reviewee', 'name')
      .populate('job', 'title');

    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/reviews/:id
router.put('/:id', async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (rating !== undefined) review.rating = rating;
    if (comment !== undefined) review.comment = comment;

    await review.save();
    res.json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/reviews/:id
router.delete('/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    await review.deleteOne();
    res.json({ message: 'Review removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
