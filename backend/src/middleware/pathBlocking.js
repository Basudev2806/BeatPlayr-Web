const logger = require('../utils/logger');

// Blocked paths configuration
const BLOCKED_PATHS = new Set([
  // Admin/sensitive paths
  '/admin',
  '/admin/*',
  '/wp-admin',
  '/wp-admin/*',
  '/wp-login.php',
  '/phpmyadmin',
  '/phpMyAdmin',
  '/mysql',
  '/database',
  
  // Common attack paths
  '/.env',
  '/.git',
  '/.git/*',
  '/config',
  '/config/*',
  '/backup',
  '/backup/*',
  '/uploads',
  '/uploads/*',
  
  // System files
  '/etc/passwd',
  '/etc/shadow',
  '/proc/*',
  '/sys/*',
  
  // Malicious attempts
  '/shell.php',
  '/cmd.php',
  '/eval.php',
  '/c99.php',
  '/r57.php',
  '/webshell.php',
  '/.well-known/security.txt',
]);

// Suspicious path patterns (regex)
const SUSPICIOUS_PATTERNS = [
  /\.\./,                    // Directory traversal
  /\/\.\./,                  // Path traversal
  /\0/,                      // Null bytes
  /%00/,                     // URL encoded null bytes
  /%2e%2e/i,                 // URL encoded ..
  /\/proc\//i,               // Linux proc filesystem
  /\/etc\//i,                // Linux etc directory
  /select.*from/i,           // SQL injection attempts
  /union.*select/i,          // SQL injection
  /script.*alert/i,          // XSS attempts
  /<script/i,                // Script tags
  /javascript:/i,            // Javascript protocol
  /vbscript:/i,              // VBScript protocol
  /onload=/i,                // Event handlers
  /onerror=/i,               // Error handlers
  /document\.cookie/i,       // Cookie theft attempts
  /base64_decode/i,          // PHP function abuse
  /eval\(/i,                 // Code execution
  /system\(/i,               // System commands
  /exec\(/i,                 // Command execution
  /passthru\(/i,             // Command execution
  /shell_exec\(/i,           // Shell execution
];

// File extension blocking
const BLOCKED_EXTENSIONS = new Set([
  '.php',
  '.asp',
  '.aspx',
  '.jsp',
  '.cgi',
  '.pl',
  '.py',
  '.rb',
  '.sh',
  '.bat',
  '.cmd',
  '.exe',
  '.com',
  '.scr',
  '.dll',
  '.so',
]);

// Request method restrictions for certain paths
const METHOD_RESTRICTIONS = {
  '/api/*': ['GET', 'POST', 'OPTIONS'],
  '/health': ['GET'],
  '/': ['GET'],
  '/api-docs': ['GET'],
  '/docs': ['GET']
};

/**
 * Check if path matches blocked patterns
 */
function isPathBlocked(path) {
  // Direct path blocking
  if (BLOCKED_PATHS.has(path)) {
    return { blocked: true, reason: 'blocked_path', pattern: path };
  }

  // Wildcard path checking
  for (const blockedPath of BLOCKED_PATHS) {
    if (blockedPath.endsWith('/*')) {
      const basePath = blockedPath.slice(0, -2);
      if (path.startsWith(basePath)) {
        return { blocked: true, reason: 'blocked_path_wildcard', pattern: blockedPath };
      }
    }
  }

  // Suspicious pattern checking
  for (const pattern of SUSPICIOUS_PATTERNS) {
    if (pattern.test(path)) {
      return { blocked: true, reason: 'suspicious_pattern', pattern: pattern.toString() };
    }
  }

  // File extension blocking
  const extension = path.split('.').pop()?.toLowerCase();
  if (extension && BLOCKED_EXTENSIONS.has(`.${extension}`)) {
    return { blocked: true, reason: 'blocked_extension', pattern: `.${extension}` };
  }

  return { blocked: false };
}

/**
 * Check if request method is allowed for path
 */
function isMethodAllowed(path, method) {
  for (const [pathPattern, allowedMethods] of Object.entries(METHOD_RESTRICTIONS)) {
    if (pathPattern.endsWith('/*')) {
      const basePath = pathPattern.slice(0, -2);
      if (path.startsWith(basePath)) {
        return allowedMethods.includes(method);
      }
    } else if (path === pathPattern) {
      return allowedMethods.includes(method);
    }
  }
  return true; // Allow by default if no restriction
}

/**
 * Path Blocking Middleware
 */
const pathBlockingMiddleware = (req, res, next) => {
  const path = req.path.toLowerCase();
  const method = req.method.toUpperCase();
  
  // Check if path is blocked
  const pathCheck = isPathBlocked(path);
  if (pathCheck.blocked) {
    logger.warn(`Blocked request to suspicious path`, {
      ip: req.clientIP || req.ip,
      path: req.path,
      originalPath: req.originalUrl,
      method: req.method,
      reason: pathCheck.reason,
      pattern: pathCheck.pattern,
      userAgent: req.headers['user-agent'],
      referer: req.headers.referer
    });

    return res.status(403).json({
      success: false,
      message: 'Access denied',
      code: 'PATH_BLOCKED',
      timestamp: new Date().toISOString()
    });
  }

  // Check if method is allowed
  if (!isMethodAllowed(path, method)) {
    logger.warn(`Blocked request with disallowed method`, {
      ip: req.clientIP || req.ip,
      path: req.path,
      method: req.method,
      userAgent: req.headers['user-agent']
    });

    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
      code: 'METHOD_NOT_ALLOWED',
      timestamp: new Date().toISOString()
    });
  }

  next();
};

/**
 * Path Management Functions
 */
const pathBlockingManager = {
  // Add blocked path
  blockPath: (path) => {
    BLOCKED_PATHS.add(path);
    logger.info(`Path ${path} added to blocked list`);
    return true;
  },

  // Remove blocked path
  unblockPath: (path) => {
    const removed = BLOCKED_PATHS.delete(path);
    if (removed) {
      logger.info(`Path ${path} removed from blocked list`);
    }
    return removed;
  },

  // Get all blocked paths
  getBlockedPaths: () => {
    return Array.from(BLOCKED_PATHS);
  },

  // Add suspicious pattern
  addSuspiciousPattern: (pattern) => {
    try {
      const regex = new RegExp(pattern, 'i');
      SUSPICIOUS_PATTERNS.push(regex);
      logger.info(`Suspicious pattern added: ${pattern}`);
      return true;
    } catch (error) {
      logger.error(`Invalid regex pattern: ${pattern}`, error);
      return false;
    }
  },

  // Get suspicious patterns
  getSuspiciousPatterns: () => {
    return SUSPICIOUS_PATTERNS.map(p => p.toString());
  },

  // Block file extension
  blockExtension: (extension) => {
    if (!extension.startsWith('.')) {
      extension = '.' + extension;
    }
    BLOCKED_EXTENSIONS.add(extension.toLowerCase());
    logger.info(`File extension ${extension} blocked`);
    return true;
  },

  // Unblock file extension
  unblockExtension: (extension) => {
    if (!extension.startsWith('.')) {
      extension = '.' + extension;
    }
    const removed = BLOCKED_EXTENSIONS.delete(extension.toLowerCase());
    if (removed) {
      logger.info(`File extension ${extension} unblocked`);
    }
    return removed;
  },

  // Get blocked extensions
  getBlockedExtensions: () => {
    return Array.from(BLOCKED_EXTENSIONS);
  },

  // Set method restrictions
  setMethodRestrictions: (path, methods) => {
    METHOD_RESTRICTIONS[path] = methods;
    logger.info(`Method restrictions set for ${path}: ${methods.join(', ')}`);
    return true;
  },

  // Get method restrictions
  getMethodRestrictions: () => {
    return { ...METHOD_RESTRICTIONS };
  },

  // Test if path would be blocked
  testPath: (path) => {
    return isPathBlocked(path);
  }
};

module.exports = {
  pathBlockingMiddleware,
  pathBlockingManager,
  isPathBlocked,
  isMethodAllowed,
  BLOCKED_PATHS,
  SUSPICIOUS_PATTERNS,
  BLOCKED_EXTENSIONS
};