const express = require('express');
const contactRoutes = require('./contact');
const featureRoutes = require('./feature');
const bugRoutes = require('./bug');
const healthController = require('../controllers/healthController');

const router = express.Router();

// Health check endpoint
router.get('/health', healthController.getHealth);

// Form routes
router.use('/contact', contactRoutes);
router.use('/feature-request', featureRoutes);
router.use('/bug-report', bugRoutes);

module.exports = router;