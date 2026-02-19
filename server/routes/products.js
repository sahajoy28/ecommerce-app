import express from 'express';
import AdminProduct from '../models/AdminProduct.js';
import { verify } from '../middleware/auth.js';
import { convertGoogleDriveUrl } from '../utils/googleDrive.js';

const router = express.Router();

/**
 * Helper: transform an AdminProduct doc into the standard API shape
 */
const transformProduct = (p) => ({
  id: p._id.toString(),
  _id: p._id.toString(),
  title: p.title,
  description: p.description,
  price: p.price,
  mrp: p.mrp,
  retailPrice: p.retailPrice,
  discount: p.discount,
  showPriceInListing: p.showPriceInListing,
  rating: p.rating || 0,
  stock: p.quantity,
  category: p.category,
  thumbnail: p.images?.[0] || '',
  image: p.images?.[0] || '',
  images: p.images || [],
  reviewCount: p.reviewCount || 0,
  reviews: p.reviews || [],
  isAdminProduct: true,
  createdBy: p.createdBy
});

/**
 * GET /api/products
 * Fetch all published products from MongoDB
 * Query params: limit (default 100), skip (default 0), category (optional)
 */
router.get('/', async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 100;
    const skip = parseInt(req.query.skip) || 0;
    const category = req.query.category;

    console.log(`📦 Fetching products from MongoDB: limit=${limit}, skip=${skip}, category=${category || 'all'}`);

    const query = {
      isActive: true,
      published: true
    };

    if (category && category !== 'all') {
      query.category = { $regex: category, $options: 'i' };
    }

    const total = await AdminProduct.countDocuments(query);

    const products = await AdminProduct.find(query)
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();

    const transformedProducts = products.map(transformProduct);

    res.json({
      success: true,
      count: transformedProducts.length,
      total,
      skip,
      products: transformedProducts
    });
  } catch (error) {
    console.error('❌ Error fetching products:', error.message);
    next({ status: 500, message: 'Failed to fetch products', details: error.message });
  }
});

/**
 * POST /api/products/admin/create
 * Create a new admin product (Admin only)
 */
router.post('/admin/create', verify, async (req, res, next) => {
  try {
    const { user } = req;

    if (user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Only admins can create products' });
    }

    const {
      title, description, price, mrp, retailPrice, discount,
      showPriceInListing, category, quantity, images
    } = req.body;

    if (!title || !description || !price || !category || !quantity || !images || images.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: title, description, price, category, quantity, images'
      });
    }

    const product = await AdminProduct.create({
      title,
      description,
      price,
      mrp: mrp || null,
      retailPrice: retailPrice || null,
      discount: discount || {},
      showPriceInListing: showPriceInListing !== undefined ? showPriceInListing : true,
      category,
      quantity,
      images: images.map(img => convertGoogleDriveUrl(img)),
      createdBy: user.id,
      isActive: true,
      published: false
    });

    console.log(`✅ Admin product created: ${product._id}`);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product: transformProduct(product)
    });
  } catch (error) {
    console.error('❌ Error creating product:', error.message);
    next({ status: 500, message: 'Failed to create product', details: error.message });
  }
});

/**
 * GET /api/products/admin/all
 * Get all admin products (Admin only)
 */
router.get('/admin/all', verify, async (req, res, next) => {
  try {
    const { user } = req;

    if (user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Only admins can view admin products' });
    }

    const products = await AdminProduct.find({ createdBy: user.id })
      .select('-reviews')
      .lean()
      .exec();

    res.json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    console.error('❌ Error fetching admin products:', error.message);
    next({ status: 500, message: 'Failed to fetch admin products', details: error.message });
  }
});

/**
 * PUT /api/products/admin/:id
 * Update admin product (Admin only)
 */
router.put('/admin/:id', verify, async (req, res, next) => {
  try {
    const { user } = req;
    const { id } = req.params;

    if (user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Only admins can update products' });
    }

    const product = await AdminProduct.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (product.createdBy.toString() !== user.id) {
      return res.status(403).json({ success: false, message: 'You can only update your own products' });
    }

    const {
      title, description, price, mrp, retailPrice, discount,
      showPriceInListing, category, quantity, images, isActive
    } = req.body;

    if (title) product.title = title;
    if (description) product.description = description;
    if (price !== undefined) product.price = price;
    if (mrp !== undefined) product.mrp = mrp;
    if (retailPrice !== undefined) product.retailPrice = retailPrice;
    if (discount !== undefined) product.discount = discount;
    if (showPriceInListing !== undefined) product.showPriceInListing = showPriceInListing;
    if (category) product.category = category;
    if (quantity !== undefined) product.quantity = quantity;
    if (images && images.length > 0) {
      product.images = images.map(img => convertGoogleDriveUrl(img));
    }
    if (isActive !== undefined) product.isActive = isActive;
    product.updatedAt = new Date();

    await product.save();

    console.log(`✅ Admin product updated: ${id}`);

    res.json({
      success: true,
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    console.error('❌ Error updating product:', error.message);
    next({ status: 500, message: 'Failed to update product', details: error.message });
  }
});

/**
 * DELETE /api/products/admin/:id
 * Delete admin product (Admin only)
 */
router.delete('/admin/:id', verify, async (req, res, next) => {
  try {
    const { user } = req;
    const { id } = req.params;

    if (user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Only admins can delete products' });
    }

    const product = await AdminProduct.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (product.createdBy.toString() !== user.id) {
      return res.status(403).json({ success: false, message: 'You can only delete your own products' });
    }

    await AdminProduct.findByIdAndDelete(id);

    console.log(`✅ Admin product deleted: ${id}`);

    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting product:', error.message);
    next({ status: 500, message: 'Failed to delete product', details: error.message });
  }
});

/**
 * GET /api/products/search
 * Search products by query
 * Query params: q (search query, required)
 */
router.get('/search', async (req, res, next) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({ success: false, message: 'Search query is required' });
    }

    console.log(`🔍 Searching products: q=${query}`);

    const products = await AdminProduct.find({
      isActive: true,
      published: true,
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } }
      ]
    }).lean();

    const transformedProducts = products.map(transformProduct);

    res.json({
      success: true,
      query,
      count: transformedProducts.length,
      products: transformedProducts
    });
  } catch (error) {
    console.error('❌ Error searching products:', error.message);
    next({ status: 500, message: 'Failed to search products', details: error.message });
  }
});

/**
 * GET /api/products/:id
 * Get single product by ID
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    console.log(`📌 Fetching product: id=${id}`);

    const product = await AdminProduct.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: `Product with ID ${id} not found` });
    }

    res.json({
      success: true,
      product: transformProduct(product)
    });
  } catch (error) {
    console.error(`❌ Error fetching product ${req.params.id}:`, error.message);
    next({ status: 500, message: 'Failed to fetch product details', details: error.message });
  }
});

/**
 * GET /api/products/category/:category
 * Get products by category
 */
router.get('/category/:category', async (req, res, next) => {
  try {
    const { category } = req.params;

    console.log(`🏷️ Fetching products by category: ${category}`);

    const products = await AdminProduct.find({
      isActive: true,
      published: true,
      category: { $regex: category, $options: 'i' }
    }).lean();

    const transformedProducts = products.map(transformProduct);

    res.json({
      success: true,
      category,
      count: transformedProducts.length,
      products: transformedProducts
    });
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({ success: false, message: `Category ${req.params.category} not found` });
    }
    console.error('❌ Error fetching category:', error.message);
    next({ status: 500, message: 'Failed to fetch products by category', details: error.message });
  }
});

/**
 * PATCH /api/products/admin/:id/publish
 * Publish an admin product (Admin only)
 */
router.patch('/admin/:id/publish', verify, async (req, res, next) => {
  try {
    const { user } = req;
    const { id } = req.params;

    if (user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Only admins can publish products' });
    }

    const product = await AdminProduct.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (product.createdBy.toString() !== user.id) {
      return res.status(403).json({ success: false, message: 'You can only publish your own products' });
    }

    product.published = true;
    await product.save();

    console.log(`✅ Product published: ${id}`);

    res.json({ success: true, message: 'Product published successfully', product });
  } catch (error) {
    console.error('❌ Error publishing product:', error.message);
    next({ status: 500, message: 'Failed to publish product', details: error.message });
  }
});

/**
 * PATCH /api/products/admin/:id/unpublish
 * Unpublish an admin product (Admin only)
 */
router.patch('/admin/:id/unpublish', verify, async (req, res, next) => {
  try {
    const { user } = req;
    const { id } = req.params;

    if (user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Only admins can unpublish products' });
    }

    const product = await AdminProduct.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (product.createdBy.toString() !== user.id) {
      return res.status(403).json({ success: false, message: 'You can only unpublish your own products' });
    }

    product.published = false;
    await product.save();

    console.log(`✅ Product unpublished: ${id}`);

    res.json({ success: true, message: 'Product unpublished successfully', product });
  } catch (error) {
    console.error('❌ Error unpublishing product:', error.message);
    next({ status: 500, message: 'Failed to unpublish product', details: error.message });
  }
});

export default router;

