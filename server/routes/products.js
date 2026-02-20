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
  videos: p.videos || [],
  reviewCount: p.reviewCount || 0,
  reviews: p.reviews || [],
  isAdminProduct: true,
  createdBy: p.createdBy,
  material: p.material || '',
  finish: p.finish || '',
  sizes: p.sizes || [],
  color: p.color || '',
  specifications: p.specifications instanceof Map ? Object.fromEntries(p.specifications) : (p.specifications || {}),
  customFilters: p.customFilters instanceof Map ? Object.fromEntries(p.customFilters) : (p.customFilters || {})
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
      showPriceInListing, category, quantity, images, videos,
      material, finish, sizes, color, specifications, customFilters
    } = req.body;

    if (!title || !description || !category || !quantity) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: title, description, price, category, quantity'
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
      images: images && images.length > 0 ? images.map(img => convertGoogleDriveUrl(img)) : [],
      videos: videos || [],
      createdBy: user.id,
      isActive: true,
      published: false,
      material: material || '',
      finish: finish || '',
      sizes: sizes || [],
      color: color || '',
      specifications: specifications || {},
      customFilters: customFilters || {}
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
      showPriceInListing, category, quantity, images, videos, isActive,
      material, finish, sizes, color, specifications, customFilters
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
    if (videos !== undefined) product.videos = videos;
    if (isActive !== undefined) product.isActive = isActive;
    if (material !== undefined) product.material = material;
    if (finish !== undefined) product.finish = finish;
    if (sizes !== undefined) product.sizes = sizes;
    if (color !== undefined) product.color = color;
    if (specifications !== undefined) product.specifications = specifications;
    if (customFilters !== undefined) product.customFilters = customFilters;
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
 * POST /api/products/admin/bulk-publish
 * Bulk publish products (Admin only)
 */
router.post('/admin/bulk-publish', verify, async (req, res, next) => {
  try {
    const { user } = req;
    if (user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Only admins can publish products' });
    }
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, message: 'Please provide an array of product IDs' });
    }
    const result = await AdminProduct.updateMany(
      { _id: { $in: ids }, createdBy: user.id },
      { $set: { published: true } }
    );
    console.log(`✅ Bulk published ${result.modifiedCount} products`);
    res.json({ success: true, message: `${result.modifiedCount} products published`, modifiedCount: result.modifiedCount });
  } catch (error) {
    console.error('❌ Error bulk publishing:', error.message);
    next({ status: 500, message: 'Failed to bulk publish products', details: error.message });
  }
});

/**
 * POST /api/products/admin/bulk-unpublish
 * Bulk unpublish products (Admin only)
 */
router.post('/admin/bulk-unpublish', verify, async (req, res, next) => {
  try {
    const { user } = req;
    if (user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Only admins can unpublish products' });
    }
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, message: 'Please provide an array of product IDs' });
    }
    const result = await AdminProduct.updateMany(
      { _id: { $in: ids }, createdBy: user.id },
      { $set: { published: false } }
    );
    console.log(`✅ Bulk unpublished ${result.modifiedCount} products`);
    res.json({ success: true, message: `${result.modifiedCount} products unpublished`, modifiedCount: result.modifiedCount });
  } catch (error) {
    console.error('❌ Error bulk unpublishing:', error.message);
    next({ status: 500, message: 'Failed to bulk unpublish products', details: error.message });
  }
});

/**
 * POST /api/products/admin/bulk-delete
 * Bulk delete products (Admin only)
 */
router.post('/admin/bulk-delete', verify, async (req, res, next) => {
  try {
    const { user } = req;
    if (user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Only admins can delete products' });
    }
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, message: 'Please provide an array of product IDs' });
    }
    const result = await AdminProduct.deleteMany(
      { _id: { $in: ids }, createdBy: user.id }
    );
    console.log(`✅ Bulk deleted ${result.deletedCount} products`);
    res.json({ success: true, message: `${result.deletedCount} products deleted`, deletedCount: result.deletedCount });
  } catch (error) {
    console.error('❌ Error bulk deleting:', error.message);
    next({ status: 500, message: 'Failed to bulk delete products', details: error.message });
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

// ──────────────────────────────────────────────
// REVIEW ENDPOINTS
// ──────────────────────────────────────────────

/**
 * POST /api/products/:id/reviews
 * Add a review to a product (requires auth)
 */
router.post('/:id/reviews', verify, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rating, title, comment } = req.body;
    const user = req.user;

    if (!rating || !title || !comment) {
      return res.status(400).json({ success: false, message: 'Rating, title, and comment are required' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, message: 'Rating must be between 1 and 5' });
    }

    const product = await AdminProduct.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Check if user already reviewed this product
    const existingReview = product.reviews.find(r => r.userId === user.id);
    if (existingReview) {
      return res.status(400).json({ success: false, message: 'You have already reviewed this product' });
    }

    const newReview = {
      id: `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: user.id,
      userName: user.name || 'Anonymous',
      rating: Number(rating),
      title: title.trim(),
      comment: comment.trim(),
      date: new Date().toISOString(),
      helpful: 0
    };

    product.reviews.push(newReview);

    // Recalculate average rating and review count
    const totalRating = product.reviews.reduce((sum, r) => sum + r.rating, 0);
    product.rating = Number((totalRating / product.reviews.length).toFixed(1));
    product.reviewCount = product.reviews.length;

    await product.save();

    console.log(`✅ Review added to product ${id} by user ${user.id}`);

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      review: newReview,
      rating: product.rating,
      reviewCount: product.reviewCount
    });
  } catch (error) {
    console.error('❌ Error adding review:', error.message);
    next({ status: 500, message: 'Failed to add review', details: error.message });
  }
});

/**
 * DELETE /api/products/:id/reviews/:reviewId
 * Delete a review (only the author can delete their review)
 */
router.delete('/:id/reviews/:reviewId', verify, async (req, res, next) => {
  try {
    const { id, reviewId } = req.params;
    const user = req.user;

    const product = await AdminProduct.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const reviewIndex = product.reviews.findIndex(r => r.id === reviewId);
    if (reviewIndex === -1) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    // Only the review author can delete
    if (product.reviews[reviewIndex].userId !== user.id) {
      return res.status(403).json({ success: false, message: 'You can only delete your own reviews' });
    }

    product.reviews.splice(reviewIndex, 1);

    // Recalculate average rating and review count
    if (product.reviews.length > 0) {
      const totalRating = product.reviews.reduce((sum, r) => sum + r.rating, 0);
      product.rating = Number((totalRating / product.reviews.length).toFixed(1));
    } else {
      product.rating = 0;
    }
    product.reviewCount = product.reviews.length;

    await product.save();

    console.log(`✅ Review ${reviewId} deleted from product ${id}`);

    res.json({
      success: true,
      message: 'Review deleted successfully',
      rating: product.rating,
      reviewCount: product.reviewCount
    });
  } catch (error) {
    console.error('❌ Error deleting review:', error.message);
    next({ status: 500, message: 'Failed to delete review', details: error.message });
  }
});

/**
 * PATCH /api/products/:id/reviews/:reviewId/helpful
 * Increment the helpful count on a review
 */
router.patch('/:id/reviews/:reviewId/helpful', async (req, res, next) => {
  try {
    const { id, reviewId } = req.params;

    const product = await AdminProduct.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const review = product.reviews.find(r => r.id === reviewId);
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    review.helpful = (review.helpful || 0) + 1;
    await product.save();

    res.json({
      success: true,
      message: 'Helpful count updated',
      helpful: review.helpful
    });
  } catch (error) {
    console.error('❌ Error updating helpful:', error.message);
    next({ status: 500, message: 'Failed to update helpful count', details: error.message });
  }
});

/**
 * POST /api/products/admin/bulk-import
 * Bulk import products from CSV data (Admin only)
 * Expects: { products: [{ title, description, category, price, mrp, quantity, material, finish, sizes, color }] }
 */
router.post('/admin/bulk-import', verify, async (req, res, next) => {
  try {
    const { user } = req;

    if (user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Only admins can bulk import products' });
    }

    const { products } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ success: false, message: 'Please provide an array of products' });
    }

    if (products.length > 500) {
      return res.status(400).json({ success: false, message: 'Maximum 500 products can be imported at once' });
    }

    const results = { created: 0, errors: [] };

    for (let i = 0; i < products.length; i++) {
      const p = products[i];
      try {
        if (!p.title || !p.description || !p.category) {
          results.errors.push({ row: i + 1, error: 'Missing required fields (title, description, category)' });
          continue;
        }

        await AdminProduct.create({
          title: p.title,
          description: p.description || '',
          price: parseFloat(p.price) || 0,
          mrp: p.mrp ? parseFloat(p.mrp) : null,
          retailPrice: p.retailPrice ? parseFloat(p.retailPrice) : null,
          discount: p.discount || {},
          showPriceInListing: p.showPriceInListing !== undefined ? p.showPriceInListing : true,
          category: p.category,
          quantity: parseInt(p.quantity) || 0,
          images: Array.isArray(p.images) ? p.images.map(img => convertGoogleDriveUrl(img)) : [],
          videos: p.videos || [],
          createdBy: user.id,
          isActive: true,
          published: false,
          material: p.material || '',
          finish: p.finish || '',
          sizes: Array.isArray(p.sizes) ? p.sizes : [],
          color: p.color || '',
          specifications: p.specifications || {},
          customFilters: p.customFilters || {}
        });
        results.created++;
      } catch (err) {
        results.errors.push({ row: i + 1, error: err.message });
      }
    }

    console.log(`✅ Bulk import: ${results.created} created, ${results.errors.length} errors`);

    res.status(201).json({
      success: true,
      message: `Successfully imported ${results.created} products${results.errors.length > 0 ? ` (${results.errors.length} errors)` : ''}`,
      created: results.created,
      errors: results.errors
    });
  } catch (error) {
    console.error('❌ Error bulk importing products:', error.message);
    next({ status: 500, message: 'Failed to bulk import products', details: error.message });
  }
});

export default router;

