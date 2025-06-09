const { formatDate, sanitizeForEmail } = require('../utils/helpers');
const { EMAIL_TEMPLATES } = require('../utils/constants');

class TemplateService {
  getBaseStyle() {
    return `
      <style>
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          margin: 0; 
          padding: 0;
          background-color: #f4f4f4;
        }
        .container { 
          max-width: 600px; 
          margin: 20px auto; 
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header { 
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px 20px; 
          text-align: center; 
        }
        .header h2 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
        }
        .content { 
          padding: 30px 20px; 
        }
        .highlight { 
          background-color: #f8f9ff; 
          padding: 15px; 
          border-left: 4px solid #667eea; 
          margin: 15px 0;
          border-radius: 4px;
        }
        .footer { 
          background-color: #f8f9fa; 
          padding: 20px; 
          text-align: center; 
          font-size: 12px; 
          color: #6c757d;
          border-top: 1px solid #dee2e6;
        }
        .info-row {
          margin: 10px 0;
          padding: 8px 0;
          border-bottom: 1px solid #eee;
        }
        .info-label {
          font-weight: 600;
          color: #495057;
        }
        .priority-high { color: #dc3545; font-weight: bold; }
        .priority-medium { color: #fd7e14; font-weight: bold; }
        .priority-low { color: #28a745; font-weight: bold; }
        .brand {
          color: #667eea;
          font-weight: 600;
        }
        .submission-id {
          font-family: monospace;
          font-size: 11px;
          color: #6c757d;
          margin-top: 10px;
        }
      </style>
    `;
  }

  getContactUserTemplate(data) {
    return {
      subject: 'Thank you for contacting BeatPlayr!',
      html: `
        ${this.getBaseStyle()}
        <div class="container">
          <div class="header">
            <h2>🎵 Thank You for Contacting BeatPlayr!</h2>
          </div>
          <div class="content">
            <p>Dear <strong>${sanitizeForEmail(data.name)}</strong>,</p>
            <p>Thank you for reaching out to us. We have received your message and our team will get back to you within 24-48 hours.</p>
            <div class="highlight">
              <div class="info-label">Your Message:</div>
              <div style="margin-top: 8px;">${sanitizeForEmail(data.message)}</div>
            </div>
            ${data.subject ? `<p><strong>Subject:</strong> ${sanitizeForEmail(data.subject)}</p>` : ''}
            <p>We appreciate your interest in <span class="brand">BeatPlayr</span> and look forward to assisting you!</p>
            <p>Best regards,<br><span class="brand">BeatPlayr Team</span></p>
          </div>
          <div class="footer">
            <p>This is an automated response. Please do not reply to this email.</p>
            <p>© 2024 BeatPlayr. All rights reserved.</p>
          </div>
        </div>
      `
    };
  }

  getContactAdminTemplate(data) {
    return {
      html: `
        ${this.getBaseStyle()}
        <div class="container">
          <div class="header">
            <h2>📧 New Contact Form Submission</h2>
          </div>
          <div class="content">
            <div class="info-row">
              <span class="info-label">Name:</span> ${sanitizeForEmail(data.name)}
            </div>
            <div class="info-row">
              <span class="info-label">Email:</span> ${data.email}
            </div>
            ${data.phone ? `<div class="info-row"><span class="info-label">Phone:</span> ${sanitizeForEmail(data.phone)}</div>` : ''}
            <div class="info-row">
              <span class="info-label">Subject:</span> ${sanitizeForEmail(data.subject) || 'General Inquiry'}
            </div>
            <div class="highlight">
              <div class="info-label">Message:</div>
              <div style="margin-top: 8px; white-space: pre-wrap;">${sanitizeForEmail(data.message)}</div>
            </div>
            <div class="info-row">
              <span class="info-label">Submitted at:</span> ${formatDate()}
            </div>
          </div>
        </div>
      `
    };
  }

  getFeatureUserTemplate(data) {
    return {
      subject: 'Thank you for your feature recommendation!',
      html: `
        ${this.getBaseStyle()}
        <div class="container">
          <div class="header">
            <h2>💡 Feature Recommendation Received!</h2>
          </div>
          <div class="content">
            <p>Dear <strong>${sanitizeForEmail(data.name)}</strong>,</p>
            <p>Thank you for your valuable feature recommendation! Your input helps us make <span class="brand">BeatPlayr</span> even better.</p>
            <div class="highlight">
              <div class="info-label">Feature: ${sanitizeForEmail(data.title)}</div>
              <div style="margin-top: 8px;">Feature Description: ${sanitizeForEmail(data.description)}</div>
              <div style="margin-top: 8px;"><span class="info-label">Problem Solved:</span> ${sanitizeForEmail(data.problemSolved)}</div>
              <div style="margin-top: 8px;"><span class="info-label">Priority:</span> <span class="priority-${data.priority.toLowerCase()}">${data.priority}</span></div>
            </div>
            <p>Our development team will review your suggestion and consider it for future updates. We may reach out if we need any clarification.</p>
            <p>Keep the great ideas coming!</p>
            <p>Best regards,<br><span class="brand">BeatPlayr Development Team</span></p>
          </div>
          <div class="footer">
            <p>Your feedback shapes the future of BeatPlayr!</p>
            <p>© 2024 BeatPlayr. All rights reserved.</p>
          </div>
        </div>
      `
    };
  }

  getFeatureAdminTemplate(data) {
    return {
      html: `
        ${this.getBaseStyle()}
        <div class="container">
          <div class="header">
            <h2>💡 New Feature Recommendation</h2>
          </div>
          <div class="content">
            <div class="info-row">
              <span class="info-label">Submitted by:</span> ${sanitizeForEmail(data.name)}
            </div>
            <div class="info-row">
              <span class="info-label">Email:</span> ${data.email}
            </div>
            <div class="info-row">
              <span class="info-label">Feature Title:</span> ${sanitizeForEmail(data.title)}
            </div>
            <div class="info-row">
              <span class="info-label">Priority:</span> <span class="priority-${data.priority.toLowerCase()}">${data.priority}</span>
            </div>
            <div class="highlight">
              <div class="info-label">Description:</div>
              <div style="margin-top: 8px; white-space: pre-wrap;">${sanitizeForEmail(data.description)}</div>
            </div>
            <div class="info-row">
              <span class="info-label">Submitted at:</span> ${formatDate()}
            </div>
          </div>
        </div>
      `
    };
  }

  getBugUserTemplate(data) {
    return {
      subject: 'Bug report received - We\'re on it!',
      html: `
        ${this.getBaseStyle()}
        <div class="container">
          <div class="header">
            <h2>🐛 Bug Report Received</h2>
          </div>
          <div class="content">
            <p>Dear <strong>${sanitizeForEmail(data.name)}</strong>,</p>
            <p>Thank you for reporting this bug! We take all bug reports seriously and will investigate this issue promptly.</p>
            <div class="highlight">
              <div class="info-label">Bug: ${sanitizeForEmail(data.title)}</div>
              <div style="margin-top: 8px;">Bug Description: ${sanitizeForEmail(data.description)}</div>
              <div style="margin-top: 8px;"><span class="info-label">Priority:</span> <span class="priority-${data.priority.toLowerCase()}">${data.priority}</span></div>
              ${data.browser ? `<div style="margin-top: 8px;"><span class="info-label">Browser/Device:</span> ${sanitizeForEmail(data.browser)}/${sanitizeForEmail(data.deviceInfo)}</div>` : ''}
              <div style="margin-top: 8px;"><span class="info-label">Steps to Reproduce:</span> ${sanitizeForEmail(data.steps)}</div>
            </div>
            <p>We'll keep you updated on the progress of this fix. Our development team will investigate and work on a solution.</p>
            <p>Thank you for helping us improve <span class="brand">BeatPlayr</span>!</p>
            <p>Best regards,<br><span class="brand">BeatPlayr Development Team</span></p>
          </div>
          <div class="footer">
            <p>Help us improve by reporting bugs!</p>
            <p>© 2024 BeatPlayr. All rights reserved.</p>
          </div>
        </div>
      `
    };
  }

  getBugAdminTemplate(data) {
    return {
      html: `
        ${this.getBaseStyle()}
        <div class="container">
          <div class="header">
            <h2>🐛 New Bug Report</h2>
          </div>
          <div class="content">
            <div class="info-row">
              <span class="info-label">Reporter:</span> ${sanitizeForEmail(data.name)}
            </div>
            <div class="info-row">
              <span class="info-label">Email:</span> ${data.email}
            </div>
            <div class="info-row">
              <span class="info-label">Bug Title:</span> ${sanitizeForEmail(data.title)}
            </div>
            <div class="info-row">
              <span class="info-label">Priority:</span> <span class="priority-${data.priority.toLowerCase()}">${data.priority}</span>
            </div>
            ${data.browser ? `<div class="info-row"><span class="info-label">Browser/Device:</span> ${sanitizeForEmail(data.browser)}</div>` : ''}
            <div class="highlight">
              <div class="info-label">Bug Description:</div>
              <div style="margin-top: 8px; white-space: pre-wrap;">${sanitizeForEmail(data.description)}</div>
            </div>
            ${data.steps ? `
              <div class="highlight">
                <div class="info-label">Steps to Reproduce:</div>
                <div style="margin-top: 8px; white-space: pre-wrap;">${sanitizeForEmail(data.steps)}</div>
              </div>
            ` : ''}
            <div class="info-row">
              <span class="info-label">Submitted at:</span> ${formatDate()}
            </div>
          </div>
        </div>
      `
    };
  }
}

module.exports = new TemplateService();