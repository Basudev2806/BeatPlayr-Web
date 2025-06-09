const emailService = require('../services/emailService');
const logger = require('../utils/logger');
const { STATUS_CODES, MESSAGES } = require('../utils/constants');
const { generateSubmissionId } = require('../utils/helpers');

const submitBugReport = async (req, res) => {
  const submissionId = generateSubmissionId();
  
  try {
    // Extract data from request body (adjust based on your sanitization middleware)
    const data = req.body.sanitized || req.body;
    const description = data.description || data.bugDescription;


    // Validate required fields
    if (!data.title || !description || !data.steps || !data.deviceInfo) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: 'Missing required fields: title, description, stepsToReproduce, and deviceInfo are required',
        submissionId
      });
    }

    // Validate priority field if provided
    const validPriorities = ['Low', 'Medium', 'High', 'low', 'medium', 'high'];
    if (data.priority && !validPriorities.includes(data.priority)) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: 'Priority must be Low, Medium, or High',
        submissionId
      });
    }
    
    // Prepare bug report data
    const bugReportData = {
      submissionId,
      name: data.name || 'Anonymous', // Handle name field from frontend
      title: data.title,
      description: description,
      steps: data.steps,
      deviceInfo: data.deviceInfo,
      browser: data.browser || 'Unknown',
      priority: data.priority || 'Medium',
      email: data.email || null,
      timestamp: new Date().toISOString(),
      userAgent: req.headers['user-agent'] || 'Unknown'
    };
    
    logger.info('Bug report submission received', { 
      submissionId,
      name: bugReportData.name,
      email: bugReportData.email, 
      title: bugReportData.title,
      priority: bugReportData.priority,
      browser: bugReportData.browser 
    });

    // Send emails with the prepared data
    await emailService.sendBugReportEmails(bugReportData);

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: MESSAGES.SUCCESS.BUG_SUBMITTED,
      submissionId
    });

    logger.info('Bug report processed successfully', { 
      submissionId,
      name: bugReportData.name,
      email: bugReportData.email,
      title: bugReportData.title 
    });

  } catch (error) {
    logger.error('Bug report submission failed:', {
      submissionId,
      error: error.message,
      stack: error.stack,
      email: (req.body.sanitized || req.body)?.email || 'unknown',
      name: (req.body.sanitized || req.body)?.name || 'unknown'
    });

    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: MESSAGES.ERROR.EMAIL_SEND_FAILED,
      submissionId
    });
  }
};

module.exports = {
  submitBugReport
};