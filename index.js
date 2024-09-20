const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/route.js');

// Load environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());


// Connect to MongoDB
mongoose.connect(process.env.mongoDb_url)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Use routes
app.use('/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
