const mongoose = require('mongoose');

const projectTrackingSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  milestones: [
    {
      title: String,
      completed: {
        type: Boolean,
        default: false,
      },
      completionDate: Date,
    },
  ],
  progress: {
    type: Number,
    default: 0, // 0–100
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('ProjectTracking', projectTrackingSchema);
