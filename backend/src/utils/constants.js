// Application constants

// Form types
const FORM_TYPES = {
  CONTACT: 'contact',
  FEATURE: 'feature',
  BUG: 'bug'
};

// Priority levels
const PRIORITY_LEVELS = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High'
};

// Email templates
const EMAIL_TEMPLATES = {
  CONTACT_USER: 'contact_user',
  CONTACT_ADMIN: 'contact_admin',
  FEATURE_USER: 'feature_user',
  FEATURE_ADMIN: 'feature_admin',
  BUG_USER: 'bug_user',
  BUG_ADMIN: 'bug_admin'
};

// HTTP status codes
const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
};

// Response messages
const MESSAGES = {
  SUCCESS: {
    CONTACT_SUBMITTED: 'Contact form submitted successfully. We\'ll get back to you soon!',
    FEATURE_SUBMITTED: 'Feature request submitted successfully. Thank you for your suggestion!',
    BUG_SUBMITTED: 'Bug report submitted successfully. We\'ll investigate this issue!',
    SERVER_RUNNING: 'Server is running'
  },
  ERROR: {
    VALIDATION_FAILED: 'Validation failed',
    MISSING_FIELDS: 'Missing required fields',
    INVALID_EMAIL: 'Invalid email format',
    EMAIL_SEND_FAILED: 'Failed to send email',
    SERVER_ERROR: 'Internal server error',
    NOT_FOUND: 'Endpoint not found',
    RATE_LIMITED: 'Too many requests. Please try again later.',
    FIELD_TOO_LONG: 'Field exceeds maximum length'
  }
};

// Validation limits
const VALIDATION_LIMITS = {
  NAME_MAX_LENGTH: 100,
  EMAIL_MAX_LENGTH: 254,
  MESSAGE_MAX_LENGTH: 5000,
  TITLE_MAX_LENGTH: 200,
  PHONE_MAX_LENGTH: 20,
  BROWSER_MAX_LENGTH: 100,
  SUBJECT_MAX_LENGTH: 200
};

// Rate limiting
const RATE_LIMIT = {
  WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  MAX_REQUESTS: 10,
  MESSAGE: 'Too many requests from this IP, please try again later.'
};

// Email configuration
const EMAIL_CONFIG = {
  FROM_NAME: 'BeatPlayr',
  ADMIN_EMAIL: 'basudev@beatplayr.online',
  SMTP_TIMEOUT: 30000 // 30 seconds
};

// Security headers
const SECURITY_HEADERS = {
  CONTENT_SECURITY_POLICY: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  }
};

// Supported browsers for bug reports
const SUPPORTED_BROWSERS = [
  'Chrome',
  'Firefox',
  'Safari',
  'Edge',
  'Opera',
  'Internet Explorer',
  'Mobile Safari',
  'Chrome Mobile',
  'Firefox Mobile'
];

// Environment types
const ENVIRONMENTS = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test'
};

// Log levels
const LOG_LEVELS = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug'
};

module.exports = {
  FORM_TYPES,
  PRIORITY_LEVELS,
  EMAIL_TEMPLATES,
  STATUS_CODES,
  MESSAGES,
  VALIDATION_LIMITS,
  RATE_LIMIT,
  EMAIL_CONFIG,
  SECURITY_HEADERS,
  SUPPORTED_BROWSERS,
  ENVIRONMENTS,
  LOG_LEVELS
};