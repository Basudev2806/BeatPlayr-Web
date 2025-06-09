const express = require('express');
const bugController = require('../controllers/bugController');
const { validation } = require('../middleware');

const router = express.Router();

// POST /api/bug-report
router.post('/', validation.bugValidation, bugController.submitBugReport);

module.exports = router;