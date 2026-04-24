import express from 'express';
import Category from '../models/Category.js';
import { verify } from '../middleware/auth.js';

const router = express.Router();

/**
 * GET /api/categories
 * Public: fetch all active categories (sorted by displayOrder)
 */
router.get('/', async (req, res, next) => {
  try {
    const { all } = req.query;
    const filter = all === 'true' ? {} : { isActive: true };
    const categories = await Category.find(filter).sort({ displayOrder: 1, name: 1 });
    res.json({ success: true, categories });
  } catch (error) {
    console.error('❌ Error fetching categories:', error.message);
    next({ status: 500, message: 'Failed to fetch categories', details: error.message });
  }
});

/**
 * GET /api/categories/home
 * Public: fetch categories to show on home page
 */
router.get('/home', async (req, res, next) => {
  try {
    const categories = await Category.find({ isActive: true, showOnHome: true }).sort({ displayOrder: 1, name: 1 });
    res.json({ success: true, categories });
  } catch (error) {
    console.error('❌ Error fetching home categories:', error.message);
    next({ status: 500, message: 'Failed to fetch home categories', details: error.message });
  }
});

/**
 * POST /api/categories
 * Admin: create a new category
 */
router.post('/', verify, async (req, res, next) => {
  try {
    const { name, icon, image, gradient, displayOrder, isActive, showOnHome } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Category name is required' });
    }

    // Check for duplicate
    const existing = await Category.findOne({ name: { $regex: new RegExp(`^${name.trim()}$`, 'i') } });
    if (existing) {
      return res.status(400).json({ success: false, message: 'A category with this name already exists' });
    }

    const category = await Category.create({
      name: name.trim(),
      icon: icon || '📦',
      image: image || '',
      gradient: gradient || '',
      displayOrder: displayOrder || 0,
      isActive: isActive !== false,
      showOnHome: showOnHome !== false,
      isPredefined: false,
      createdBy: req.user.id
    });

    console.log(`✅ Category created: ${category.name}`);
    res.status(201).json({ success: true, category });
  } catch (error) {
    console.error('❌ Error creating category:', error.message);
    next({ status: 500, message: 'Failed to create category', details: error.message });
  }
});

/**
 * PUT /api/categories/:id
 * Admin: update a category
 */
router.put('/:id', verify, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, icon, image, gradient, displayOrder, isActive, showOnHome, description, appliedFilters } = req.body;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    // Check for duplicate name (excluding current)
    if (name && name.trim() !== category.name) {
      const existing = await Category.findOne({
        name: { $regex: new RegExp(`^${name.trim()}$`, 'i') },
        _id: { $ne: id }
      });
      if (existing) {
        return res.status(400).json({ success: false, message: 'A category with this name already exists' });
      }
      category.name = name.trim();
    }

    if (icon !== undefined) category.icon = icon;
    if (image !== undefined) category.image = image;
    if (gradient !== undefined) category.gradient = gradient;
    if (displayOrder !== undefined) category.displayOrder = displayOrder;
    if (isActive !== undefined) category.isActive = isActive;
    if (showOnHome !== undefined) category.showOnHome = showOnHome;
    if (description !== undefined) category.description = description;
    if (appliedFilters !== undefined) category.appliedFilters = appliedFilters;

    await category.save();

    console.log(`✅ Category updated: ${category.name}`);
    res.json({ success: true, category });
  } catch (error) {
    console.error('❌ Error updating category:', error.message);
    next({ status: 500, message: 'Failed to update category', details: error.message });
  }
});

/**
 * DELETE /api/categories/:id
 * Admin: delete a category
 */
router.delete('/:id', verify, async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    await Category.findByIdAndDelete(id);

    console.log(`✅ Category deleted: ${category.name}`);
    res.json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting category:', error.message);
    next({ status: 500, message: 'Failed to delete category', details: error.message });
  }
});

/**
 * POST /api/categories/seed
 * Admin: seed default categories (only if none exist)
 */
router.post('/seed', verify, async (req, res, next) => {
  try {
    await Category.seedDefaults();
    const categories = await Category.find().sort({ displayOrder: 1 });
    res.json({ success: true, message: 'Categories seeded', categories });
  } catch (error) {
    console.error('❌ Error seeding categories:', error.message);
    next({ status: 500, message: 'Failed to seed categories', details: error.message });
  }
});

/**
 * GET /api/categories/:slug/details
 * Public: get category with its applied filters
 */
router.get('/:slug/details', async (req, res, next) => {
  try {
    const { slug } = req.params;
    
    const category = await Category.findOne({
      $or: [
        { slug: slug },
        { _id: slug }
      ]
    }).populate({
      path: 'appliedFilters',
      select: 'name slug type options rangeMin rangeMax rangeUnit icon displayOrder',
      match: { isActive: true },
      options: { sort: { displayOrder: 1 } }
    });

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.json({ success: true, category });
  } catch (error) {
    console.error('❌ Error fetching category details:', error.message);
    next({ status: 500, message: 'Failed to fetch category details', details: error.message });
  }
});

/**
 * PUT /api/categories/:id/filters
 * Admin: set category-specific filters
 */
router.put('/:id/filters', verify, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { appliedFilters } = req.body;

    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Only admins can manage category filters' });
    }

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    // Validate filter IDs
    if (Array.isArray(appliedFilters)) {
      category.appliedFilters = appliedFilters;
    } else {
      return res.status(400).json({ success: false, message: 'appliedFilters must be an array of filter IDs' });
    }

    await category.save();
    await category.populate({
      path: 'appliedFilters',
      select: 'name slug type options rangeMin rangeMax rangeUnit icon displayOrder'
    });

    console.log(`✅ Category filters updated: ${category.name}`);
    res.json({ success: true, category });
  } catch (error) {
    console.error('❌ Error updating category filters:', error.message);
    next({ status: 500, message: 'Failed to update category filters', details: error.message });
  }
});

export default router;
