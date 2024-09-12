const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
        token = req.headers.authorization.split(' ')[1];

        // Decode token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
        // Fetch the user from the database
        req.user = await User.findById(decoded.id).select('-password');
  
        next();
      } catch (error) {
        console.error('Token validation failed', error);
        res.status(401).json({ message: 'Not authorized, token failed' });
      }
    }
  
    if (!token) {
      res.status(401).json({ message: 'Not authorized, no token' });
    }
  };
  
module.exports = { protect };
  