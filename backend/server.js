const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const reviewRoutes = require('./routes/reviewRoutes');

// Simple test route

app.get('/', (req, res) => {
  res.send('Sana3eya API is running');
});

app.use('/api/reviews', reviewRoutes);





// TODO: we will add: const reviewRoutes = require('./routes/reviewRoutes');
// and app.use('/api/reviews', reviewRoutes); later

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || '';

// Connect to MongoDB
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
