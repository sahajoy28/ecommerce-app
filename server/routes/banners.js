import express from 'express';
import Banner from '../models/Banner.js';
import { verify } from '../middleware/auth.js';

const router = express.Router();

/**
 * GET /api/banners
 * Fetch all active banners (public endpoint)
 * Query params: type (optional), limit, skip
 */
router.get('/', async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 100;
    const skip = parseInt(req.query.skip) || 0;
    const type = req.query.type;

    // Build query - only get active banners
    const query = { 
      isActive: true,
      $or: [
        { endDate: null },
        { endDate: { $gte: new Date() } }
      ]
    };

    if (type && type !== 'all') {
      query.type = type;
    }

    // Fetch total count
    const total = await Banner.countDocuments(query);

    // Fetch banners sorted by position
    const banners = await Banner.find(query)
      .sort({ position: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-createdBy')
      .lean()
      .exec();

    res.json({
      success: true,
      count: banners.length,
      total: total,
      banners: banners
    });
  } catch (error) {
    console.error('❌ Error fetching banners:', error.message);
    next({
      status: 500,
      message: 'Failed to fetch banners',
      details: error.message
    });
  }
});

/**
 * GET /api/banners/admin/list
 * Fetch all banners for admin (admin only)
 */
router.get('/admin/list', verify, async (req, res, next) => {
  try {
    const { user } = req;

    // Check if user is admin
    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only admins can view all banners'
      });
    }

    const limit = parseInt(req.query.limit) || 100;
    const skip = parseInt(req.query.skip) || 0;

    // Fetch total count
    const total = await Banner.countDocuments();

    // Fetch all banners
    const banners = await Banner.find()
      .populate('createdBy', 'name email')
      .sort({ position: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();

    res.json({
      success: true,
      count: banners.length,
      total: total,
      banners: banners
    });
  } catch (error) {
    console.error('❌ Error fetching admin banners:', error.message);
    next({
      status: 500,
      message: 'Failed to fetch banners',
      details: error.message
    });
  }
});

/**
 * POST /api/banners/admin/create
 * Create a new banner (admin only)
 */
router.post('/admin/create', verify, async (req, res, next) => {
  try {
    const { user } = req;

    // Check if user is admin
    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only admins can create banners'
      });
    }

    const { title, description, imageUrl, link, position, type, startDate, endDate } = req.body;

    // Validation
    if (!title || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Title and image URL are required'
      });
    }

    // Create banner
    const banner = new Banner({
      title,
      description: description || '',
      imageUrl,
      link: link || '',
      position: position || 0,
      type: type || 'promotional',
      startDate: startDate ? new Date(startDate) : new Date(),
      endDate: endDate ? new Date(endDate) : null,
      createdBy: user.id,
      isActive: true
    });

    await banner.save();
    await banner.populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Banner created successfully',
      banner: banner
    });
  } catch (error) {
    console.error('❌ Error creating banner:', error.message);
    next({
      status: 500,
      message: 'Failed to create banner',
      details: error.message
    });
  }
});

/**
 * PATCH /api/banners/admin/:id
 * Update a banner (admin only)
 */
router.patch('/admin/:id', verify, async (req, res, next) => {
  try {
    const { user } = req;

    // Check if user is admin
    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only admins can update banners'
      });
    }

    const { title, description, imageUrl, link, position, type, isActive, startDate, endDate } = req.body;

    // Find and update banner
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: 'Banner not found'
      });
    }

    // Update fields
    if (title) banner.title = title;
    if (description !== undefined) banner.description = description;
    if (imageUrl) banner.imageUrl = imageUrl;
    if (link !== undefined) banner.link = link;
    if (position !== undefined) banner.position = position;
    if (type) banner.type = type;
    if (isActive !== undefined) banner.isActive = isActive;
    if (startDate) banner.startDate = new Date(startDate);
    if (endDate) banner.endDate = new Date(endDate);

    await banner.save();
    await banner.populate('createdBy', 'name email');

    res.json({
      success: true,
      message: 'Banner updated successfully',
      banner: banner
    });
  } catch (error) {
    console.error('❌ Error updating banner:', error.message);
    next({
      status: 500,
      message: 'Failed to update banner',
      details: error.message
    });
  }
});

/**
 * DELETE /api/banners/admin/:id
 * Delete a banner (admin only)
 */
router.delete('/admin/:id', verify, async (req, res, next) => {
  try {
    const { user } = req;

    // Check if user is admin
    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only admins can delete banners'
      });
    }

    const banner = await Banner.findByIdAndDelete(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: 'Banner not found'
      });
    }

    res.json({
      success: true,
      message: 'Banner deleted successfully'
    });
  } catch (error) {
    console.error('❌ Error deleting banner:', error.message);
    next({
      status: 500,
      message: 'Failed to delete banner',
      details: error.message
    });
  }
});

export default router;
