import express from 'express';
import axios from 'axios';

const router = express.Router();

const EXTERNAL_API_BASE = 'https://dummyjson.com/products';

/**
 * GET /api/products
 * Fetch all products from DummyJSON API
 * Query params: limit (default 100)
 */
router.get('/', async (req, res, next) => {
  try {
    const limit = req.query.limit || 100;
    const skip = req.query.skip || 0;

    console.log(`📦 Fetching products from DummyJSON: limit=${limit}, skip=${skip}`);

    const response = await axios.get(`${EXTERNAL_API_BASE}?limit=${limit}&skip=${skip}`);

    if (!response.data || !response.data.products) {
      throw new Error('Invalid response format from external API');
    }

    res.json({
      success: true,
      count: response.data.products.length,
      total: response.data.total,
      skip: response.data.skip,
      products: response.data.products
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

    res.json({
      success: true,
      query,
      count: response.data.products.length,
      products: response.data.products
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

    res.json({
      success: true,
      category,
      count: response.data.products.length,
      products: response.data.products
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
