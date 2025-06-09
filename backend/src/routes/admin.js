const express = require('express');
const { ipBlockingManager } = require('../middleware/iPBlocking');
const { pathBlockingManager } = require('../middleware/pathBlocking');
const logger = require('../utils/logger');

const router = express.Router();

// Simple API key authentication (use proper auth in production)
const API_KEY = process.env.ADMIN_API_KEY || 'your-secret-admin-key';

// Authentication middleware
const authenticate = (req, res, next) => {
  const apiKey = req.headers['x-api-key'] || req.query.apiKey;
  
  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized - Invalid API key'
    });
  }
  
  next();
};

// Apply authentication to all admin routes
router.use(authenticate);

/**
 * IP BLOCKING MANAGEMENT
 */

// Get blocking status
router.get('/blocking/status', (req, res) => {
  try {
    const status = {
      blockedIPs: ipBlockingManager.getBlockedIPs(),
      suspiciousIPs: ipBlockingManager.getSuspiciousIPs(),
      blockedPaths: pathBlockingManager.getBlockedPaths(),
      blockedExtensions: pathBlockingManager.getBlockedExtensions(),
      methodRestrictions: pathBlockingManager.getMethodRestrictions()
    };

    res.json({
      success: true,
      message: 'Blocking status retrieved',
      data: status
    });
  } catch (error) {
    logger.error('Error getting blocking status:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Block IP address
router.post('/blocking/ip/block', (req, res) => {
  try {
    const { ip, reason } = req.body;
    
    if (!ip) {
      return res.status(400).json({
        success: false,
        message: 'IP address is required'
      });
    }

    const result = ipBlockingManager.blockIP(ip, reason);
    
    res.json({
      success: true,
      message: `IP ${ip} blocked successfully`,
      data: { ip, reason, blocked: result }
    });
  } catch (error) {
    logger.error('Error blocking IP:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Unblock IP address
router.post('/blocking/ip/unblock', (req, res) => {
  try {
    const { ip } = req.body;
    
    if (!ip) {
      return res.status(400).json({
        success: false,
        message: 'IP address is required'
      });
    }

    const result = ipBlockingManager.unblockIP(ip);
    
    res.json({
      success: true,
      message: `IP ${ip} unblocked successfully`,
      data: { ip, unblocked: result }
    });
  } catch (error) {
    logger.error('Error unblocking IP:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get IP stats
router.get('/blocking/ip/:ip/stats', (req, res) => {
  try {
    const { ip } = req.params;
    const stats = ipBlockingManager.getIPStats(ip);
    
    res.json({
      success: true,
      message: 'IP stats retrieved',
      data: stats
    });
  } catch (error) {
    logger.error('Error getting IP stats:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Clear all temporary blocks
router.post('/blocking/ip/clear-temporary', (req, res) => {
  try {
    ipBlockingManager.clearTemporaryBlocks();
    
    res.json({
      success: true,
      message: 'All temporary IP blocks cleared'
    });
  } catch (error) {
    logger.error('Error clearing temporary blocks:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

/**
 * PATH BLOCKING MANAGEMENT
 */

// Block path
router.post('/blocking/path/block', (req, res) => {
  try {
    const { path } = req.body;
    
    if (!path) {
      return res.status(400).json({
        success: false,
        message: 'Path is required'
      });
    }

    const result = pathBlockingManager.blockPath(path);
    
    res.json({
      success: true,
      message: `Path ${path} blocked successfully`,
      data: { path, blocked: result }
    });
  } catch (error) {
    logger.error('Error blocking path:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Unblock path
router.post('/blocking/path/unblock', (req, res) => {
  try {
    const { path } = req.body;
    
    if (!path) {
      return res.status(400).json({
        success: false,
        message: 'Path is required'
      });
    }

    const result = pathBlockingManager.unblockPath(path);
    
    res.json({
      success: true,
      message: result ? `Path ${path} unblocked successfully` : `Path ${path} was not blocked`,
      data: { path, unblocked: result }
    });
  } catch (error) {
    logger.error('Error unblocking path:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Test path blocking
router.post('/blocking/path/test', (req, res) => {
  try {
    const { path } = req.body;
    
    if (!path) {
      return res.status(400).json({
        success: false,
        message: 'Path is required'
      });
    }

    const result = pathBlockingManager.testPath(path);
    
    res.json({
      success: true,
      message: 'Path test completed',
      data: {
        path,
        wouldBeBlocked: result.blocked,
        reason: result.reason || null,
        pattern: result.pattern || null
      }
    });
  } catch (error) {
    logger.error('Error testing path:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Block file extension
router.post('/blocking/extension/block', (req, res) => {
  try {
    const { extension } = req.body;
    
    if (!extension) {
      return res.status(400).json({
        success: false,
        message: 'File extension is required'
      });
    }

    const result = pathBlockingManager.blockExtension(extension);
    
    res.json({
      success: true,
      message: `Extension ${extension} blocked successfully`,
      data: { extension, blocked: result }
    });
  } catch (error) {
    logger.error('Error blocking extension:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Unblock file extension
router.post('/blocking/extension/unblock', (req, res) => {
  try {
    const { extension } = req.body;
    
    if (!extension) {
      return res.status(400).json({
        success: false,
        message: 'File extension is required'
      });
    }

    const result = pathBlockingManager.unblockExtension(extension);
    
    res.json({
      success: true,
      message: result ? `Extension ${extension} unblocked successfully` : `Extension ${extension} was not blocked`,
      data: { extension, unblocked: result }
    });
  } catch (error) {
    logger.error('Error unblocking extension:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Add suspicious pattern
router.post('/blocking/pattern/add', (req, res) => {
  try {
    const { pattern } = req.body;
    
    if (!pattern) {
      return res.status(400).json({
        success: false,
        message: 'Pattern is required'
      });
    }

    const result = pathBlockingManager.addSuspiciousPattern(pattern);
    
    res.json({
      success: result,
      message: result ? `Pattern added successfully` : `Invalid pattern`,
      data: { pattern, added: result }
    });
  } catch (error) {
    logger.error('Error adding pattern:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get blocking statistics
router.get('/blocking/stats', (req, res) => {
  try {
    const blocked = ipBlockingManager.getBlockedIPs();
    const suspicious = ipBlockingManager.getSuspiciousIPs();
    
    const stats = {
      totalBlockedIPs: blocked.permanent.length + blocked.manual.length + blocked.temporary.length,
      permanentBlocks: blocked.permanent.length,
      manualBlocks: blocked.manual.length,
      temporaryBlocks: blocked.temporary.length,
      suspiciousIPs: suspicious.length,
      blockedPaths: pathBlockingManager.getBlockedPaths().length,
      blockedExtensions: pathBlockingManager.getBlockedExtensions().length,
      suspiciousPatterns: pathBlockingManager.getSuspiciousPatterns().length
    };

    res.json({
      success: true,
      message: 'Blocking statistics retrieved',
      data: stats
    });
  } catch (error) {
    logger.error('Error getting blocking stats:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;