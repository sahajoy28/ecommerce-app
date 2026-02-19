import express from 'express';
import Inquiry from '../models/Inquiry.js';
import { verify } from '../middleware/auth.js';
import { sendEmail } from '../utils/sendEmail.js';

const router = express.Router();

/**
 * POST /api/inquiries/contact
 * General contact form submission (no product required)
 * Body: name, email, phone, subject, message
 */
router.post('/contact', async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: name, email, phone, subject, message'
      });
    }

    console.log(`📝 New contact message from ${name} (${email}): ${subject}`);

    // Save as inquiry (with subject as productName for reuse)
    const inquiry = new Inquiry({
      name,
      email,
      phone,
      productId: new (await import('mongoose')).default.Types.ObjectId(), // placeholder
      productName: `[Contact] ${subject}`,
      quantity: '1',
      quantityUnit: 'units',
      message: message || '',
      status: 'new'
    });

    await inquiry.save();
    console.log(`✅ Contact message saved: ${inquiry._id}`);

    // Send email notification to admin
    const emailResult = await sendEmail({
      subject: `New Contact Form: ${subject}`,
      text: [
        `New contact form submission:`,
        ``,
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Subject: ${subject}`,
        ``,
        `Message:`,
        message,
        ``,
        `---`,
        `Sent from your website contact form`,
      ].join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr><td style="padding: 8px; font-weight: bold; color: #555;">Name:</td><td style="padding: 8px;">${name}</td></tr>
            <tr style="background: #f9f9f9;"><td style="padding: 8px; font-weight: bold; color: #555;">Email:</td><td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px; font-weight: bold; color: #555;">Phone:</td><td style="padding: 8px;"><a href="tel:${phone}">${phone}</a></td></tr>
            <tr style="background: #f9f9f9;"><td style="padding: 8px; font-weight: bold; color: #555;">Subject:</td><td style="padding: 8px;">${subject}</td></tr>
          </table>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Message:</h3>
            <p style="color: #555; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #999; font-size: 12px; margin-top: 30px;">
            This email was sent from your website contact form.
          </p>
        </div>
      `,
    });

    if (emailResult.sent) {
      console.log(`📧 Admin notification email sent`);
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! We will get back to you soon.',
    });
  } catch (error) {
    console.error('❌ Error processing contact form:', error.message);
    next({
      status: 500,
      message: 'Failed to send message',
      details: error.message
    });
  }
});

/**
 * POST /api/inquiries
 * Create a new inquiry/lead
 * Body: name, email, phone, productId, productName, quantity, quantityUnit, message
 */
router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone, productId, productName, quantity, quantityUnit, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !productId || !productName || !quantity) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, email, phone, productId, productName, quantity'
      });
    }

    console.log(`📝 New inquiry from ${name} for product ${productName}`);

    // Create inquiry
    const inquiry = new Inquiry({
      name,
      email,
      phone,
      productId,
      productName,
      quantity,
      quantityUnit: quantityUnit || 'units',
      message: message || '',
      status: 'new'
    });

    await inquiry.save();

    // Send email notification to admin
    sendEmail({
      subject: `New Product Inquiry: ${productName}`,
      text: `New inquiry from ${name} (${email}, ${phone}) for ${productName} — Qty: ${quantity} ${quantityUnit || 'units'}. Message: ${message || 'None'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px;">New Product Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr><td style="padding: 8px; font-weight: bold; color: #555;">Name:</td><td style="padding: 8px;">${name}</td></tr>
            <tr style="background: #f9f9f9;"><td style="padding: 8px; font-weight: bold; color: #555;">Email:</td><td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px; font-weight: bold; color: #555;">Phone:</td><td style="padding: 8px;"><a href="tel:${phone}">${phone}</a></td></tr>
            <tr style="background: #f9f9f9;"><td style="padding: 8px; font-weight: bold; color: #555;">Product:</td><td style="padding: 8px;">${productName}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; color: #555;">Quantity:</td><td style="padding: 8px;">${quantity} ${quantityUnit || 'units'}</td></tr>
          </table>
          ${message ? `<div style="background: #f5f5f5; padding: 15px; border-radius: 8px;"><h3 style="margin-top: 0; color: #333;">Message:</h3><p style="color: #555;">${message}</p></div>` : ''}
          <p style="color: #999; font-size: 12px; margin-top: 30px;">This email was sent from your website.</p>
        </div>
      `,
    }).catch(() => {}); // Fire and forget — don't block response

    // TODO: Send email to admin/owner
    console.log(`✅ Inquiry saved: ${inquiry._id}`);

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully. We will contact you soon.',
      inquiry
    });
  } catch (error) {
    console.error('❌ Error creating inquiry:', error.message);
    next({
      status: 500,
      message: 'Failed to submit inquiry',
      details: error.message
    });
  }
});

/**
 * GET /api/inquiries
 * Get all inquiries (admin only)
 */
router.get('/', verify, async (req, res, next) => {
  try {
    const user = req.user;

    // Check if user is admin
    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only admins can view inquiries'
      });
    }

    const { status, limit = 50, skip = 0 } = req.query;
    const query = { isArchived: false };

    if (status && status !== 'all') {
      query.status = status;
    }

    const inquiries = await Inquiry.find(query)
      .sort({ createdAt: -1 })
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .lean();

    const total = await Inquiry.countDocuments(query);

    res.json({
      success: true,
      count: inquiries.length,
      total,
      inquiries
    });
  } catch (error) {
    console.error('❌ Error fetching inquiries:', error.message);
    next({
      status: 500,
      message: 'Failed to fetch inquiries',
      details: error.message
    });
  }
});

/**
 * PATCH /api/inquiries/:id
 * Update inquiry status (admin only)
 */
router.patch('/:id', verify, async (req, res, next) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const { status, notes } = req.body;

    // Check if user is admin
    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only admins can update inquiries'
      });
    }

    if (!status || !['new', 'contacted', 'quote-sent', 'closed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: new, contacted, quote-sent, closed'
      });
    }

    const inquiry = await Inquiry.findByIdAndUpdate(
      id,
      {
        status,
        notes: notes || inquiry?.notes,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    console.log(`✅ Inquiry ${id} updated to status: ${status}`);

    res.json({
      success: true,
      message: 'Inquiry updated successfully',
      inquiry
    });
  } catch (error) {
    console.error('❌ Error updating inquiry:', error.message);
    next({
      status: 500,
      message: 'Failed to update inquiry',
      details: error.message
    });
  }
});

/**
 * DELETE /api/inquiries/:id
 * Archive inquiry (soft delete - admin only)
 */
router.delete('/:id', verify, async (req, res, next) => {
  try {
    const user = req.user;
    const { id } = req.params;

    // Check if user is admin
    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only admins can delete inquiries'
      });
    }

    const inquiry = await Inquiry.findByIdAndUpdate(
      id,
      { isArchived: true, updatedAt: new Date() },
      { new: true }
    );

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    console.log(`✅ Inquiry ${id} archived`);

    res.json({
      success: true,
      message: 'Inquiry archived successfully'
    });
  } catch (error) {
    console.error('❌ Error archiving inquiry:', error.message);
    next({
      status: 500,
      message: 'Failed to archive inquiry',
      details: error.message
    });
  }
});

export default router;
