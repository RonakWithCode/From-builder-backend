// routes/formRoutes.js

const express = require('express');
const { createForm, submitForm, getFormSubmissions, getFormById, updateSubmissionStatus } = require('../controllers/formController');
const authMiddleware = require('../middlewares/authMiddleware.js');
const router = express.Router();
const apiKeyMiddleware = require('../middlewares/apiKeyMiddleware.js');

// Existing routes
router.post('/create', authMiddleware, createForm);
router.post('/submit/:formId', apiKeyMiddleware, submitForm);
router.get('/:formId/submissions', authMiddleware, getFormSubmissions);
router.get('/:formId', authMiddleware, getFormById);

// New route to update submission status
router.patch('/:formId/submissions/:submissionId', authMiddleware, updateSubmissionStatus);

module.exports = router;
