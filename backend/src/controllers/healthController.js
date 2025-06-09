const emailService = require('../services/emailService');
const config = require('../config');
const logger = require('../utils/logger');
const { STATUS_CODES, MESSAGES } = require('../utils/constants');

const getHealth = async (req, res) => {
  try {
    // Basic health info
    const healthInfo = {
      success: true,
      message: MESSAGES.SUCCESS.SERVER_RUNNING,
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()),
      environment: config.nodeEnv,
      version: process.env.npm_package_version || '1.0.0',
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB'
      },
      node: process.version
    };

    // Optional: Check SMTP connection (remove if causing delays)
    try {
      const smtpHealthy = await emailService.verifyConnection();
      healthInfo.smtp = {
        status: smtpHealthy ? 'connected' : 'disconnected',
        host: config.email.host
      };
    } catch (error) {
      healthInfo.smtp = {
        status: 'error',
        host: config.email.host,
        error: error.message
      };
    }

    res.status(STATUS_CODES.OK).json(healthInfo);
    
  } catch (error) {
    logger.error('Health check failed:', error);
    res.status(STATUS_CODES.SERVICE_UNAVAILABLE).json({
      success: false,
      message: 'Service unavailable',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
};

module.exports = {
  getHealth
};