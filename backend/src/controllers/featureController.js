const emailService = require('../services/emailService');
const logger = require('../utils/logger');
const { STATUS_CODES, MESSAGES } = require('../utils/constants');
const { generateSubmissionId } = require('../utils/helpers');

const submitFeatureRequest = async (req, res) => {
  const submissionId = generateSubmissionId();
  
  try {

    const data = req.body.sanitized;
    
    logger.info('Feature request submission received', { 
      submissionId,
      email: data.email || 'anonymous', 
      title: data.title,
      priority: data.priority 
    });

    // Send emails
    await emailService.sendFeatureRequestEmails(data);

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: MESSAGES.SUCCESS.FEATURE_SUBMITTED,
      submissionId
    });

    logger.info('Feature request processed successfully', { 
      submissionId,
      email: data.email || 'anonymous',
      title: data.title 
    });

  } catch (error) {
    logger.error('Feature request submission failed:', {
      submissionId,
      error: error.message,
      email: req.body.sanitized?.email || 'unknown'
    });

    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: MESSAGES.ERROR.EMAIL_SEND_FAILED,
      submissionId
    });
  }
};

module.exports = {
  submitFeatureRequest
};