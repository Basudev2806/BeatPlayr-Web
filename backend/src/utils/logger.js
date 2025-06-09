const config = require('../config');

class Logger {
  constructor() {
    this.isDevelopment = config.nodeEnv === 'development';
  }

  formatMessage(level, message, meta = {}) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level: level.toUpperCase(),
      message,
      ...meta
    };

    if (this.isDevelopment) {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    }
    
    return JSON.stringify(logEntry);
  }

  info(message, meta = {}) {
    console.log(this.formatMessage('info', message, meta));
  }

  error(message, meta = {}) {
    console.error(this.formatMessage('error', message, meta));
  }

  warn(message, meta = {}) {
    console.warn(this.formatMessage('warn', message, meta));
  }

  debug(message, meta = {}) {
    if (this.isDevelopment) {
      console.debug(this.formatMessage('debug', message, meta));
    }
  }
}

module.exports = new Logger();