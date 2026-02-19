import express from 'express';
import Inquiry from '../models/Inquiry.js';
import { verify } from '../middleware/auth.js';

const router = express.Router();

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
