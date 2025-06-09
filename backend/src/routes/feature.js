const express = require('express');
const featureController = require('../controllers/featureController');
const { validation } = require('../middleware');

const router = express.Router();

// POST /api/feature-request
router.post('/', validation.featureValidation, featureController.submitFeatureRequest);

module.exports = router;