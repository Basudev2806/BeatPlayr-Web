const rateLimit = require('express-rate-limit');
const config = require('../config');
const logger = require('../utils/logger');

const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  message: {
    success: false,
    message: config.rateLimit.message
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res) => {
    logger.warn('Rate limit exceeded', {
      ip: req.ip,
      path: req.path,
      userAgent: req.get('User-Agent')
    });
    
    res.status(429).json({
      success: false,
      message: config.rateLimit.message,
      retryAfter: Math.round(config.rateLimit.windowMs / 1000)
    });
  },
  skip: (req) => {
    // Skip rate limiting for health checks
    return req.path === '/health' || req.path === '/api/health';
  }
});

module.exports = limiter;