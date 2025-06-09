const validator = require('validator');
const config = require('../config');
const { STATUS_CODES, MESSAGES } = require('../utils/constants');
const { cleanPhoneNumber } = require('../utils/helpers');

const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return validator.escape(input.trim());
};

const validateEmail = (email) => {
  return validator.isEmail(email) && email.length <= config.validation.maxEmailLength;
};

const validateRequired = (fields, body) => {
  const missing = fields.filter(field => !body[field] || body[field].trim() === '');
  return missing;
};

const validateLength = (value, maxLength, fieldName) => {
  if (value && value.length > maxLength) {
    throw new Error(`${fieldName} must be less than ${maxLength} characters`);
  }
};

const contactValidation = (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Check required fields
    const missing = validateRequired(['name', 'email', 'message'], req.body);
    if (missing.length > 0) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: `Missing required fields: ${missing.join(', ')}`
      });
    }

    // Validate email
    if (!validateEmail(email)) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: MESSAGES.ERROR.INVALID_EMAIL
      });
    }

    // Validate lengths
    validateLength(name, config.validation.maxNameLength, 'Name');
    validateLength(message, config.validation.maxMessageLength, 'Message');
    validateLength(subject, config.validation.maxTitleLength, 'Subject');
    validateLength(phone, config.validation.maxPhoneLength, 'Phone');

    // Sanitize inputs
    req.body.sanitized = {
      name: sanitizeInput(name),
      email: email.toLowerCase().trim(),
      phone: phone ? cleanPhoneNumber(sanitizeInput(phone)) : '',
      subject: subject ? sanitizeInput(subject) : '',
      message: sanitizeInput(message)
    };

    next();
  } catch (error) {
    res.status(STATUS_CODES.BAD_REQUEST).json({
      success: false,
      message: error.message
    });
  }
};

const featureValidation = (req, res, next) => {
  try {
    const { featureTitle, featureDescription, problemSolved, email } = req.body;

    // Check required fields
    const missing = validateRequired(['featureTitle', 'featureDescription'], req.body);
    if (missing.length > 0) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: `Missing required fields: ${missing.join(', ')}`
      });
    }

    // Validate email if provided
    if (email && !validateEmail(email)) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: MESSAGES.ERROR.INVALID_EMAIL
      });
    }

    // Validate lengths
    validateLength(featureTitle, config.validation.maxTitleLength, 'Feature Title');
    validateLength(featureDescription, config.validation.maxMessageLength, 'Feature Description');
    if (problemSolved) {
      validateLength(problemSolved, config.validation.maxMessageLength, 'Problem Description');
    }

    // Sanitize inputs
    req.body.sanitized = {
      title: sanitizeInput(featureTitle),
      description: sanitizeInput(featureDescription),
      problemSolved: problemSolved ? sanitizeInput(problemSolved) : '',
      email: email ? email.toLowerCase().trim() : '',
      priority: 'Medium' // Default priority
    };

    next();
  } catch (error) {
    res.status(STATUS_CODES.BAD_REQUEST).json({
      success: false,
      message: error.message
    });
  }
};



const bugValidation = (req, res, next) => {
  try {
    const { name, email, title, description, steps, browser, priority, deviceInfo } = req.body;

    // Check required fields
    const missing = validateRequired(['name', 'email', 'title', 'description', 'steps', 'browser', 'deviceInfo'], req.body);
    if (missing.length > 0) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: `Missing required fields: ${missing.join(', ')}`
      });
    }

    // Validate email
    if (!validateEmail(email)) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: MESSAGES.ERROR.INVALID_EMAIL
      });
    }

    // Validate lengths
    validateLength(name, config.validation.maxNameLength, 'Name');
    validateLength(title, config.validation.maxTitleLength, 'Title');
    validateLength(description, config.validation.maxMessageLength, 'Description');
    validateLength(steps, config.validation.maxMessageLength, 'Steps');
    validateLength(deviceInfo, config.validation.maxMessageLength, 'Device Info');
    validateLength(browser, 100, 'Browser');

    // Validate priority
    const validPriorities = ['Low', 'Medium', 'High'];
    if (priority && !validPriorities.includes(priority)) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: 'Priority must be Low, Medium, or High'
      });
    }

    // Sanitize inputs
    req.body.sanitized = {
      name: sanitizeInput(name),
      email: email.toLowerCase().trim(),
      title: sanitizeInput(title),
      description: sanitizeInput(description),
      steps: steps ? sanitizeInput(steps) : '',
      deviceInfo: sanitizeInput(deviceInfo),
      browser: browser ? sanitizeInput(browser) : '',
      priority: priority ? sanitizeInput(priority) : 'Medium'
    };

    next();
  } catch (error) {
    res.status(STATUS_CODES.BAD_REQUEST).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  contactValidation,
  featureValidation,
  bugValidation,
  sanitizeInput,
  validateEmail
};