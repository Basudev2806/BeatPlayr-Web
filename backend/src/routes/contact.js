const express = require('express');
const contactController = require('../controllers/contactController');
const { validation } = require('../middleware');

const router = express.Router();

// POST /api/contact
router.post('/', validation.contactValidation, contactController.submitContact);

module.exports = router;