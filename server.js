const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Your DB config file

dotenv.config();

// Connect to the database
connectDB();

const app = express();
app.use(express.json());

// Enable CORS for requests from localhost:5173 or from other domains
app.use(cors({
  origin: 'https://from-builder-backend.vercel.app',  // Allow your frontend URL (or change this for production)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allowed HTTP methods
  credentials: true  // If you're using cookies or HTTP authentication
}));

// Add a test GET route for Postman or browser testing
app.get('/api/test', (req, res) => {
  res.json({ message: "API is working correctly!" });
});

// API routes
app.use('/api/users', require('./routes/userRoutes'));  // User routes
app.use('/api/forms', require('./routes/formRoutes'));  // Form routes
app.use('/api/projects', require('./routes/projectRoutes'));  // Project routes

module.exports = app;  // Export the app for Vercel
