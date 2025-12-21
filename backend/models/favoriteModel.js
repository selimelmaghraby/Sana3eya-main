<<<<<<< HEAD
const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Favorite", favoriteSchema);

module.exports = mongoose.model("Favorite", favoriteSchema);
=======
const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  savedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
    },
  ],
  savedWorkers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

module.exports = mongoose.model('Favorites', favoriteSchema);
>>>>>>> 87006ef09b45c27146415e38226e2a49928a865f
