const express = require('express');
const { createProject, getProjects, getProjectById } = require('../controllers/projectController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/create', authMiddleware, createProject);
router.get('/', authMiddleware, getProjects);
router.get('/:id', authMiddleware, getProjectById); // New route for fetching project by ID

module.exports = router;
