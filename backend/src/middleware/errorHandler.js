const logger = require('../utils/logger');
const config = require('../config');
const { STATUS_CODES, MESSAGES } = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  // Log the error
  logger.error('Unhandled error:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  // Don't leak error details in production
  const isDevelopment = config.nodeEnv === 'development';
  
  // Default error response
  let statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR;
  let message = MESSAGES.ERROR.SERVER_ERROR;
  
  // Handle specific error types
  if (err.name === 'ValidationError') {
    statusCode = STATUS_CODES.BAD_REQUEST;
    message = MESSAGES.ERROR.VALIDATION_FAILED;
  } else if (err.name === 'UnauthorizedError') {
    statusCode = STATUS_CODES.UNAUTHORIZED;
    message = 'Unauthorized';
  } else if (err.name === 'CastError') {
    statusCode = STATUS_CODES.BAD_REQUEST;
    message = 'Invalid data format';
  } else if (err.code === 11000) {
    statusCode = STATUS_CODES.BAD_REQUEST;
    message = 'Duplicate entry';
  } else if (err.code === 'EAUTH' || err.code === 'ECONNECTION') {
    statusCode = STATUS_CODES.SERVICE_UNAVAILABLE;
    message = 'Email service temporarily unavailable';
  }

  // Prepare error response
  const errorResponse = {
    success: false,
    message: message,
    timestamp: new Date().toISOString()
  };

  // Add error details in development
  if (isDevelopment) {
    errorResponse.error = {
      message: err.message,
      stack: err.stack,
      name: err.name
    };
  }

  res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;