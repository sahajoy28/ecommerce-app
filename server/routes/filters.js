import express from 'express';
import CustomFilter from '../models/CustomFilter.js';
import { verify } from '../middleware/auth.js';

const router = express.Router();

/**
 * GET /api/filters
 * Public: fetch all active filters (for sidebar display)
 */
router.get('/', async (req, res, next) => {
  try {
    const { all } = req.query;
    const filter = all === 'true' ? {} : { isActive: true, showInSidebar: true };
    const filters = await CustomFilter.find(filter).sort({ displayOrder: 1, name: 1 });
    res.json({ success: true, filters });
  } catch (error) {
    console.error('❌ Error fetching filters:', error.message);
    next({ status: 500, message: 'Failed to fetch filters', details: error.message });
  }
});

/**
 * POST /api/filters
 * Admin: create a new custom filter
 */
router.post('/', verify, async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Only admins can create filters' });
    }

    const { name, type, options, rangeMin, rangeMax, rangeUnit, icon, displayOrder, isActive, showInSidebar } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Filter name is required' });
    }

    const existing = await CustomFilter.findOne({ name: { $regex: new RegExp(`^${name.trim()}$`, 'i') } });
    if (existing) {
      return res.status(400).json({ success: false, message: 'A filter with this name already exists' });
    }

    const customFilter = await CustomFilter.create({
      name: name.trim(),
      type: type || 'checkbox',
      options: options || [],
      rangeMin: rangeMin || 0,
      rangeMax: rangeMax || 100,
      rangeUnit: rangeUnit || '',
      icon: icon || '🔖',
      displayOrder: displayOrder || 0,
      isActive: isActive !== false,
      showInSidebar: showInSidebar !== false,
      createdBy: req.user.id
    });

    console.log(`✅ Custom filter created: ${customFilter.name}`);
    res.status(201).json({ success: true, filter: customFilter });
  } catch (error) {
    console.error('❌ Error creating filter:', error.message);
    next({ status: 500, message: 'Failed to create filter', details: error.message });
  }
});

/**
 * PUT /api/filters/:id
 * Admin: update a custom filter
 */
router.put('/:id', verify, async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Only admins can update filters' });
    }

    const { id } = req.params;
    const { name, type, options, rangeMin, rangeMax, rangeUnit, icon, displayOrder, isActive, showInSidebar } = req.body;

    const customFilter = await CustomFilter.findById(id);
    if (!customFilter) {
      return res.status(404).json({ success: false, message: 'Filter not found' });
    }

    if (name && name.trim() !== customFilter.name) {
      const existing = await CustomFilter.findOne({
        name: { $regex: new RegExp(`^${name.trim()}$`, 'i') },
        _id: { $ne: id }
      });
      if (existing) {
        return res.status(400).json({ success: false, message: 'A filter with this name already exists' });
      }
      customFilter.name = name.trim();
    }

    if (type !== undefined) customFilter.type = type;
    if (options !== undefined) customFilter.options = options;
    if (rangeMin !== undefined) customFilter.rangeMin = rangeMin;
    if (rangeMax !== undefined) customFilter.rangeMax = rangeMax;
    if (rangeUnit !== undefined) customFilter.rangeUnit = rangeUnit;
    if (icon !== undefined) customFilter.icon = icon;
    if (displayOrder !== undefined) customFilter.displayOrder = displayOrder;
    if (isActive !== undefined) customFilter.isActive = isActive;
    if (showInSidebar !== undefined) customFilter.showInSidebar = showInSidebar;

    await customFilter.save();

    console.log(`✅ Custom filter updated: ${customFilter.name}`);
    res.json({ success: true, filter: customFilter });
  } catch (error) {
    console.error('❌ Error updating filter:', error.message);
    next({ status: 500, message: 'Failed to update filter', details: error.message });
  }
});

/**
 * DELETE /api/filters/:id
 * Admin: delete a custom filter
 */
router.delete('/:id', verify, async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Only admins can delete filters' });
    }

    const { id } = req.params;
    const customFilter = await CustomFilter.findById(id);
    if (!customFilter) {
      return res.status(404).json({ success: false, message: 'Filter not found' });
    }

    await CustomFilter.findByIdAndDelete(id);
    console.log(`✅ Custom filter deleted: ${customFilter.name}`);
    res.json({ success: true, message: 'Filter deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting filter:', error.message);
    next({ status: 500, message: 'Failed to delete filter', details: error.message });
  }
});

export default router;
