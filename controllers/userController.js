// /controllers/userController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Generate access token
const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Generate refresh token
const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

// Register a new user
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ username, email, password });
    await user.save();

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.json({ accessToken, refreshToken, user: { id: user._id, username, email } });
  } catch (err) {
    res.status(500).send('Server error');
  }
};


// Login an existing user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User does not exist with email:', email);
      return res.status(400).json({ msg: 'User does not exist' });
    }

    // Check if the password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      console.log('Password mismatch for user:', email);
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Return tokens and user data
    res.json({ accessToken, refreshToken, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    console.error('Server error during login:', err);
    res.status(500).send('Server error');
  }
};


// Refresh the access token
exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.status(401).json({ msg: 'No token provided' });

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const accessToken = generateAccessToken({ id: decoded.id });
    res.json({ accessToken });
  } catch (err) {
    res.status(403).json({ msg: 'Invalid refresh token' });
  }
};
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Get the user by ID, but exclude the password
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error fetching user details:', err);
    res.status(500).send('Server error');
  }
};
