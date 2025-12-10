const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const reviewRoutes = require('./routes/reviewRoutes');
const authRoutes = require('./routes/authRoutes');
const trackingRoutes = require('./routes/trackingRoutes'); // Teleb's routes

// Simple test route
app.get('/', (req, res) => {
  res.send('Sana3eya API is running');
});

app.use('/api/reviews', reviewRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tracking', trackingRoutes); // Teleb's endpoints

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || '';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });

