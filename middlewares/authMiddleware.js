const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if the authorization header exists and starts with "Bearer"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'Authorization denied. No token provided.' });
  }

  // Extract the token from the authorization header
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token with the secret key from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user information (user id) to the request object
    req.user = decoded;
    next();
  } catch (err) {
    // If the token is invalid, return an error response
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
