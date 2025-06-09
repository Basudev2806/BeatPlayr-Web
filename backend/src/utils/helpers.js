const validator = require('validator');

/**
 * Capitalize first letter of a string
 */
const capitalize = (str) => {
  if (!str || typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Generate a random ID
 */
const generateId = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Format date to readable string
 */
const formatDate = (date = new Date()) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  }).format(date);
};

/**
 * Sanitize input for email templates
 */
const sanitizeForEmail = (input) => {
  if (!input) return '';
  return validator.escape(String(input))
    .replace(/\n/g, '<br>')
    .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
};

/**
 * Check if string is valid URL
 */
const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

/**
 * Parse user agent for browser info
 */
const parseBrowserInfo = (userAgent) => {
  if (!userAgent) return 'Unknown';
  
  const browsers = {
    'Chrome': /Chrome\/([0-9.]+)/,
    'Firefox': /Firefox\/([0-9.]+)/,
    'Safari': /Safari\/([0-9.]+)/,
    'Edge': /Edge\/([0-9.]+)/,
    'Opera': /Opera\/([0-9.]+)/
  };

  for (const [browser, regex] of Object.entries(browsers)) {
    const match = userAgent.match(regex);
    if (match) {
      return `${browser} ${match[1]}`;
    }
  }

  return 'Unknown Browser';
};

/**
 * Generate submission ID for tracking
 */
const generateSubmissionId = () => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `${timestamp}-${random}`;
};

/**
 * Validate priority levels
 */
const isValidPriority = (priority) => {
  const validPriorities = ['low', 'medium', 'high'];
  return validPriorities.includes(priority?.toLowerCase());
};

/**
 * Clean phone number
 */
const cleanPhoneNumber = (phone) => {
  if (!phone) return '';
  return phone.replace(/[^\d+\-\s()]/g, '');
};

/**
 * Truncate text for email subjects
 */
const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

module.exports = {
  capitalize,
  generateId,
  formatDate,
  sanitizeForEmail,
  isValidUrl,
  parseBrowserInfo,
  generateSubmissionId,
  isValidPriority,
  cleanPhoneNumber,
  truncateText
};