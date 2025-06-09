const nodemailer = require('nodemailer');
const config = require('../config');
const logger = require('../utils/logger');
const templateService = require('./templateService');
const { EMAIL_CONFIG } = require('../utils/constants');

class EmailService {
  constructor() {
    this.transporter = null;
    this.initializeTransporter();
  }

  initializeTransporter() {
    try {
      this.transporter = nodemailer.createTransport({
        host: config.email.host,
        port: config.email.port,
        secure: config.email.secure,
        auth: {
          user: config.email.user,
          pass: config.email.pass
        },
        tls: {
          rejectUnauthorized: false,
          ciphers: 'SSLv3'
        },
        timeout: EMAIL_CONFIG.SMTP_TIMEOUT,
        requireTLS: true,
        connectionTimeout: 60000, // 60 seconds
        greetingTimeout: 30000,   // 30 seconds
        socketTimeout: 60000,     // 60 seconds
        debug: config.nodeEnv === 'development', // Enable debug in development
        logger: config.nodeEnv === 'development' // Enable logging in development
      });

      logger.info('Email transporter initialized successfully');
    } catch (error) {
      logger.error('Failed to initialize email transporter:', error);
      throw error;
    }
  }

  async sendEmail(to, subject, html) {
    try {
      const mailOptions = {
        from: `"${EMAIL_CONFIG.FROM_NAME}" <${config.email.user}>`,
        to: to,
        subject: subject,
        html: html
      };

      const info = await this.transporter.sendMail(mailOptions);
      logger.info(`Email sent successfully to ${to}`, { messageId: info.messageId });
      return info;
    } catch (error) {
      logger.error(`Failed to send email to ${to}:`, error);
      throw error;
    }
  }

  async sendContactEmails(data) {
    try {
      const userTemplate = templateService.getContactUserTemplate(data);
      const adminTemplate = templateService.getContactAdminTemplate(data);

      // Send email to user
      await this.sendEmail(
        data.email,
        userTemplate.subject,
        userTemplate.html
      );

      // Send email to admin
      await this.sendEmail(
        EMAIL_CONFIG.ADMIN_EMAIL,
        `New Contact Form: ${data.subject || 'General Inquiry'}`,
        adminTemplate.html
      );

      logger.info('Contact form emails sent successfully');
    } catch (error) {
      logger.error('Failed to send contact emails:', error);
      throw error;
    }
  }

  async sendFeatureRequestEmails(data) {
    try {
      const userTemplate = templateService.getFeatureUserTemplate(data);
      const adminTemplate = templateService.getFeatureAdminTemplate(data);

      // Send email to user
      await this.sendEmail(
        data.email,
        userTemplate.subject,
        userTemplate.html
      );

      // Send email to admin
      await this.sendEmail(
        EMAIL_CONFIG.ADMIN_EMAIL,
        `New Feature Request: ${data.title}`,
        adminTemplate.html
      );

      logger.info('Feature request emails sent successfully');
    } catch (error) {
      logger.error('Failed to send feature request emails:', error);
      throw error;
    }
  }

  async sendBugReportEmails(data) {
    try {
      const userTemplate = templateService.getBugUserTemplate(data);
      const adminTemplate = templateService.getBugAdminTemplate(data);

      // Send email to user
      await this.sendEmail(
        data.email,
        userTemplate.subject,
        userTemplate.html
      );

      // Send email to admin
      await this.sendEmail(
        EMAIL_CONFIG.ADMIN_EMAIL,
        `🐛 Bug Report: ${data.title}`,
        adminTemplate.html
      );

      logger.info('Bug report emails sent successfully');
    } catch (error) {
      logger.error('Failed to send bug report emails:', error);
      throw error;
    }
  }

  async verifyConnection() {
    try {
      await this.transporter.verify();
      logger.info('SMTP connection verified successfully');
      return true;
    } catch (error) {
      logger.error('SMTP connection verification failed:', error);
      return false;
    }
  }
}

module.exports = new EmailService();