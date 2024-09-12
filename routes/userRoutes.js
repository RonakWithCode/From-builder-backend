// /routes/userRoutes.js
const express = require('express');
const { register, login, refreshToken , getMe } = require('../controllers/userController');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); // This middleware ensures the user is authenticated

router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshToken);
router.get('/me', authMiddleware, getMe); // Protected route to get the current user

module.exports = router;
