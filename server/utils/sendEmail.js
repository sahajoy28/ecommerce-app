import nodemailer from 'nodemailer';
import SiteSettings from '../models/SiteSettings.js';

/**
 * Send an email using SMTP credentials stored in SiteSettings.
 * If SMTP is not configured, logs a warning and skips sending.
 *
 * @param {Object} options
 * @param {string} options.to - Recipient email (defaults to admin email from settings)
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Plain text body
 * @param {string} options.html - HTML body (optional)
 * @returns {Promise<{sent: boolean, info?: any, error?: string}>}
 */
export async function sendEmail({ to, subject, text, html }) {
  try {
    const settings = await SiteSettings.getSettings();
    const smtpEmail = settings.smtpEmail;
    const smtpAppPassword = settings.smtpAppPassword;
    const adminEmail = to || settings.email;

    if (!smtpEmail || !smtpAppPassword) {
      console.warn('⚠️ SMTP not configured in Site Settings — email not sent');
      return { sent: false, error: 'SMTP not configured' };
    }

    if (!adminEmail) {
      console.warn('⚠️ No recipient email configured — email not sent');
      return { sent: false, error: 'No recipient email' };
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpEmail,
        pass: smtpAppPassword,
      },
    });

    const mailOptions = {
      from: `"${settings.businessName || 'Website'}" <${smtpEmail}>`,
      to: adminEmail,
      subject,
      text,
      ...(html && { html }),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${adminEmail}: ${info.messageId}`);
    return { sent: true, info };
  } catch (error) {
    console.error('❌ Failed to send email:', error.message);
    return { sent: false, error: error.message };
  }
}
