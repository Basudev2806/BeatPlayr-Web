const logger = require('../utils/logger');

// In-memory storage for blocked IPs (use database in production)
const blockedIPs = new Set();
const suspiciousIPs = new Map(); // IP -> { count, lastAttempt, blockedUntil }

// Configuration
const IP_BLOCKING_CONFIG = {
  MAX_ATTEMPTS: 10,           // Max requests before blocking
  BLOCK_DURATION: 15 * 60 * 1000, // 15 minutes in milliseconds
  MONITOR_WINDOW: 5 * 60 * 1000,  // 5 minutes monitoring window
  SUSPICIOUS_THRESHOLD: 5,     // Requests that trigger monitoring
};

// Manually blocked IPs (add malicious IPs here)
const PERMANENTLY_BLOCKED_IPS = new Set([
  // '192.168.1.100',  // Example blocked IP
  // '10.0.0.50',      // Example blocked IP
]);

/**
 * Get client IP address from request
 */
function getClientIP(req) {
  return req.ip || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress ||
         (req.connection.socket ? req.connection.socket.remoteAddress : null) ||
         req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
         req.headers['x-real-ip'] ||
         'unknown';
}

/**
 * Check if IP is blocked
 */
function isIPBlocked(ip) {
  // Check permanently blocked IPs
  if (PERMANENTLY_BLOCKED_IPS.has(ip)) {
    return { blocked: true, reason: 'permanently_blocked', until: 'permanent' };
  }

  // Check manually blocked IPs
  if (blockedIPs.has(ip)) {
    return { blocked: true, reason: 'manually_blocked', until: 'manual' };
  }

  // Check temporarily blocked IPs
  const suspicious = suspiciousIPs.get(ip);
  if (suspicious && suspicious.blockedUntil > Date.now()) {
    return { 
      blocked: true, 
      reason: 'temporarily_blocked', 
      until: new Date(suspicious.blockedUntil).toISOString(),
      remainingTime: Math.ceil((suspicious.blockedUntil - Date.now()) / 1000)
    };
  }

  // Clean up expired blocks
  if (suspicious && suspicious.blockedUntil <= Date.now()) {
    suspiciousIPs.delete(ip);
  }

  return { blocked: false };
}

/**
 * Track IP activity and block if suspicious
 */
function trackIPActivity(ip) {
  const now = Date.now();
  let suspicious = suspiciousIPs.get(ip);

  if (!suspicious) {
    suspicious = { count: 0, lastAttempt: now, blockedUntil: 0 };
    suspiciousIPs.set(ip, suspicious);
  }

  // Reset count if outside monitoring window
  if (now - suspicious.lastAttempt > IP_BLOCKING_CONFIG.MONITOR_WINDOW) {
    suspicious.count = 1;
    suspicious.lastAttempt = now;
    return;
  }

  // Increment count
  suspicious.count++;
  suspicious.lastAttempt = now;

  // Block if exceeded max attempts
  if (suspicious.count >= IP_BLOCKING_CONFIG.MAX_ATTEMPTS) {
    suspicious.blockedUntil = now + IP_BLOCKING_CONFIG.BLOCK_DURATION;
    logger.warn(`IP ${ip} temporarily blocked for ${IP_BLOCKING_CONFIG.BLOCK_DURATION / 1000}s after ${suspicious.count} attempts`);
    return;
  }

  // Log suspicious activity
  if (suspicious.count >= IP_BLOCKING_CONFIG.SUSPICIOUS_THRESHOLD) {
    logger.warn(`Suspicious activity from IP ${ip}: ${suspicious.count} requests in monitoring window`);
  }
}

/**
 * IP Blocking Middleware
 */
const ipBlockingMiddleware = (req, res, next) => {
  const clientIP = getClientIP(req);
  const blockStatus = isIPBlocked(clientIP);

  if (blockStatus.blocked) {
    logger.warn(`Blocked request from IP ${clientIP}`, {
      reason: blockStatus.reason,
      path: req.path,
      method: req.method,
      userAgent: req.headers['user-agent']
    });

    const errorResponse = {
      success: false,
      message: 'Access denied',
      code: 'IP_BLOCKED',
      timestamp: new Date().toISOString()
    };

    // Add retry information for temporary blocks
    if (blockStatus.reason === 'temporarily_blocked') {
      errorResponse.retryAfter = blockStatus.remainingTime;
      errorResponse.blockedUntil = blockStatus.until;
      res.set('Retry-After', blockStatus.remainingTime);
    }

    return res.status(403).json(errorResponse);
  }

  // Track activity for potential blocking
  trackIPActivity(clientIP);

  // Add IP info to request for logging
  req.clientIP = clientIP;
  
  next();
};

/**
 * Manual IP Management Functions
 */
const ipBlockingManager = {
  // Block IP manually
  blockIP: (ip, reason = 'manual') => {
    blockedIPs.add(ip);
    logger.info(`IP ${ip} manually blocked - reason: ${reason}`);
    return true;
  },

  // Unblock IP
  unblockIP: (ip) => {
    blockedIPs.delete(ip);
    suspiciousIPs.delete(ip);
    logger.info(`IP ${ip} unblocked`);
    return true;
  },

  // Get blocked IPs list
  getBlockedIPs: () => {
    return {
      permanent: Array.from(PERMANENTLY_BLOCKED_IPS),
      manual: Array.from(blockedIPs),
      temporary: Array.from(suspiciousIPs.entries())
        .filter(([ip, data]) => data.blockedUntil > Date.now())
        .map(([ip, data]) => ({
          ip,
          blockedUntil: new Date(data.blockedUntil).toISOString(),
          remainingTime: Math.ceil((data.blockedUntil - Date.now()) / 1000)
        }))
    };
  },

  // Get suspicious IPs (not yet blocked)
  getSuspiciousIPs: () => {
    return Array.from(suspiciousIPs.entries())
      .filter(([ip, data]) => data.blockedUntil <= Date.now() && data.count >= IP_BLOCKING_CONFIG.SUSPICIOUS_THRESHOLD)
      .map(([ip, data]) => ({
        ip,
        attemptCount: data.count,
        lastAttempt: new Date(data.lastAttempt).toISOString()
      }));
  },

  // Clear all temporary blocks
  clearTemporaryBlocks: () => {
    suspiciousIPs.clear();
    logger.info('All temporary IP blocks cleared');
    return true;
  },

  // Get IP activity stats
  getIPStats: (ip) => {
    const suspicious = suspiciousIPs.get(ip);
    const blockStatus = isIPBlocked(ip);
    
    return {
      ip,
      blocked: blockStatus.blocked,
      blockReason: blockStatus.reason || null,
      blockedUntil: blockStatus.until || null,
      attemptCount: suspicious?.count || 0,
      lastAttempt: suspicious ? new Date(suspicious.lastAttempt).toISOString() : null
    };
  }
};

module.exports = {
  ipBlockingMiddleware,
  ipBlockingManager,
  getClientIP,
  isIPBlocked,
  IP_BLOCKING_CONFIG
};