import express from 'express';
import axios from 'axios';
import AdminProduct from '../models/AdminProduct.js';
import { verify } from '../middleware/auth.js';

const router = express.Router();

const EXTERNAL_API_BASE = 'https://dummyjson.com/products';

/**
 * GET /api/products
 * Fetch all products from DummyJSON API + Admin products
 * Query params: limit (default 100)
 */
router.get('/', async (req, res, next) => {
  try {
    const limit = req.query.limit || 100;
    const skip = req.query.skip || 0;

    console.log(`📦 Fetching products from DummyJSON: limit=${limit}, skip=${skip}`);

    // Fetch from DummyJSON
    const response = await axios.get(`${EXTERNAL_API_BASE}?limit=${limit}&skip=${skip}`);

    if (!response.data || !response.data.products) {
      throw new Error('Invalid response format from external API');
    }

    // Fetch admin-created products
    const adminProducts = await AdminProduct.find({ isActive: true })
      .lean()
      .exec();

    // Transform admin products to match DummyJSON format
    const transformedAdminProducts = adminProducts.map(p => ({
      id: p._id.toString(),
      _id: p._id.toString(),
      title: p.title,
      description: p.description,
      price: p.price,
      discountPercentage: 0,
      rating: p.rating || 0,
      stock: p.quantity,
      brand: 'Admin',
      category: p.category,
      thumbnail: p.images[0] || '',
      images: p.images,
      reviewCount: p.reviewCount,
      reviews: p.reviews,
      isAdminProduct: true,
      createdBy: p.createdBy
    }));

    // merge products
    const allProducts = [...response.data.products, ...transformedAdminProducts];

    res.json({
      success: true,
      count: allProducts.length,
      total: response.data.total + transformedAdminProducts.length,
      skip: skip,
      products: allProducts.slice(0, limit)
    });
  } catch (error) {
    console.error('❌ Error fetching products:', error.message);
    next({
      status: 500,
      message: 'Failed to fetch products from external API',
      details: error.message
    });
  }
});

/**
 * POST /api/products/admin/create
 * Create a new admin product (Admin only)
 */
router.post('/admin/create', verify, async (req, res, next) => {
  try {
    const { user } = req;

    // Check if user is admin
    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only admins can create products'
      });
    }

    const { title, description, price, category, quantity, images } = req.body;

    // Validation
    if (!title || !description || !price || !category || !quantity || !images || images.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: title, description, price, category, quantity, images'
      });
    }

    // Create product
    const product = await AdminProduct.create({
      title,
      description,
      price,
      category,
      quantity,
      images,
      createdBy: user.id
    });

    console.log(`✅ Admin product created: ${product._id}`);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product: {
        id: product._id,
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        quantity: product.quantity,
        images: product.images
      }
    });
  } catch (error) {
    console.error('❌ Error creating product:', error.message);
    next({
      status: 500,
      message: 'Failed to create product',
      details: error.message
    });
  }
});

/**
 * GET /api/products/admin/all
 * Get all admin products (Admin only)
 */
router.get('/admin/all', verify, async (req, res, next) => {
  try {
    const { user } = req;

    // Check if user is admin
    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only admins can view admin products'
      });
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
    next({
      status: 500,
      message: 'Failed to fetch admin products',
      details: error.message
    });
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

    // Check if user is admin
    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only admins can update products'
      });
    }

    // Find product and check ownership
    const product = await AdminProduct.findById(id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (product.createdBy.toString() !== user.id) {
      return res.status(403).json({
        success: false,
        message: 'You can only update your own products'
      });
    }

    // Update fields
    const { title, description, price, category, quantity, images, isActive } = req.body;
    
    if (title) product.title = title;
    if (description) product.description = description;
    if (price !== undefined) product.price = price;
    if (category) product.category = category;
    if (quantity !== undefined) product.quantity = quantity;
    if (images && images.length > 0) product.images = images;
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
    next({
      status: 500,
      message: 'Failed to update product',
      details: error.message
    });
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

    // Check if user is admin
    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only admins can delete products'
      });
    }

    // Find product and check ownership
    const product = await AdminProduct.findById(id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (product.createdBy.toString() !== user.id) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own products'
      });
    }

    await AdminProduct.findByIdAndDelete(id);

    console.log(`✅ Admin product deleted: ${id}`);

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('❌ Error deleting product:', error.message);
    next({
      status: 500,
      message: 'Failed to delete product',
      details: error.message
    });
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
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    console.log(`🔍 Searching products: q=${query}`);

    const response = await axios.get(`${EXTERNAL_API_BASE}/search?q=${query}`);

    // Also search admin products
    const adminProducts = await AdminProduct.find({ 
      isActive: true,
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } }
      ]
    }).lean();

    const transformedAdminProducts = adminProducts.map(p => ({
      id: p._id.toString(),
      title: p.title,
      description: p.description,
      price: p.price,
      category: p.category,
      images: p.images,
      stock: p.quantity,
      isAdminProduct: true
    }));

    const allProducts = [...response.data.products, ...transformedAdminProducts];

    res.json({
      success: true,
      query,
      count: allProducts.length,
      products: allProducts
    });
  } catch (error) {
    console.error('❌ Error searching products:', error.message);
    next({
      status: 500,
      message: 'Failed to search products',
      details: error.message
    });
  }
});

/**
 * GET /api/products/:id
 * Get single product by ID
 * Params: id (product ID)
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    console.log(`📌 Fetching product: id=${id}`);

    // Try to find in admin products first
    const adminProduct = await AdminProduct.findById(id);
    if (adminProduct) {
      return res.json({
        success: true,
        product: {
          id: adminProduct._id,
          title: adminProduct.title,
          description: adminProduct.description,
          price: adminProduct.price,
          category: adminProduct.category,
          stock: adminProduct.quantity,
          images: adminProduct.images,
          rating: adminProduct.rating,
          reviews: adminProduct.reviews,
          isAdminProduct: true
        }
      });
    }

    // Fall back to DummyJSON
    const response = await axios.get(`${EXTERNAL_API_BASE}/${id}`);

    res.json({
      success: true,
      product: response.data
    });
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({
        success: false,
        message: `Product with ID ${req.params.id} not found`
      });
    }

    console.error(`❌ Error fetching product ${req.params.id}:`, error.message);
    next({
      status: 500,
      message: 'Failed to fetch product details',
      details: error.message
    });
  }
});

/**
 * GET /api/products/category/:category
 * Get products by category
 * Params: category (product category)
 */
router.get('/category/:category', async (req, res, next) => {
  try {
    const { category } = req.params;

    console.log(`🏷️ Fetching products by category: ${category}`);

    const response = await axios.get(`${EXTERNAL_API_BASE}/category/${category}`);

    // Also get admin products in same category
    const adminProducts = await AdminProduct.find({ 
      isActive: true,
      category: { $regex: category, $options: 'i' }
    }).lean();

    const transformedAdminProducts = adminProducts.map(p => ({
      id: p._id.toString(),
      title: p.title,
      description: p.description,
      price: p.price,
      category: p.category,
      images: p.images,
      stock: p.quantity,
      rating: p.rating,
      isAdminProduct: true
    }));

    const allProducts = [...response.data.products, ...transformedAdminProducts];

    res.json({
      success: true,
      category,
      count: allProducts.length,
      products: allProducts
    });
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({
        success: false,
        message: `Category ${req.params.category} not found`
      });
    }

    console.error(`❌ Error fetching category:`, error.message);
    next({
      status: 500,
      message: 'Failed to fetch products by category',
      details: error.message
    });
  }
});

export default router;

