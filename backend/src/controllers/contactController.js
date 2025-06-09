const emailService = require('../services/emailService');
const logger = require('../utils/logger');
const { STATUS_CODES, MESSAGES } = require('../utils/constants');
const { generateSubmissionId } = require('../utils/helpers');

const submitContact = async (req, res) => {
  const submissionId = generateSubmissionId();
  
  try {
    const data = req.body.sanitized;
    
    logger.info('Contact form submission received', { 
      submissionId,
      email: data.email, 
      subject: data.subject || 'General Inquiry' 
    });

    // Send emails
    await emailService.sendContactEmails(data);

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: MESSAGES.SUCCESS.CONTACT_SUBMITTED,
      submissionId
    });

    logger.info('Contact form processed successfully', { 
      submissionId,
      email: data.email 
    });

  } catch (error) {
    logger.error('Contact form submission failed:', {
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
  submitContact
};