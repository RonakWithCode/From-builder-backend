const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Your DB config file

dotenv.config();

// Connect to the database
connectDB();

const app = express();
app.use(express.json());

// Enable CORS for requests from localhost:5173
app.use(cors({
  origin: 'http://localhost:5173',  // Allow only this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allowed HTTP methods
  credentials: true  // If you're using cookies or HTTP authentication
}));

// API routes
app.use('/api/users', require('./routes/userRoutes'));  // User routes
app.use('/api/forms', require('./routes/formRoutes'));  // Form routes
app.use('/api/projects', require('./routes/projectRoutes'));  // Project routes

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
