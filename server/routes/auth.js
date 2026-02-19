import express from 'express';
import User from '../models/User.js';
import { verify, generateToken } from '../middleware/auth.js';

const router = express.Router();

/**
 * POST /api/auth/signup
 * Register a new user
 */
router.post('/signup', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password'
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Check if this is the first user - if so, make them admin
    const userCount = await User.countDocuments();
    const isFirstUser = userCount === 0;

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: isFirstUser ? 'admin' : 'user'
    });

    // Generate token
    const token = generateToken(user._id);

    console.log(`✅ User registered: ${email} (Role: ${user.role})`);

    res.status(201).json({
      success: true,
      message: isFirstUser ? '🎉 Admin account created! Welcome to your store.' : 'Account created successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        cart: user.cart,
        wishlist: user.wishlist
      }
    });
  } catch (error) {
    console.error('❌ Signup error:', error.message);
    
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered'
      });
    }

    next({
      status: 500,
      message: error.message || 'Registration failed'
    });
  }
});

/**
 * POST /api/auth/login
 * Login user with email and password
 */
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find user (include password field)
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = generateToken(user._id);

    console.log(`🔐 Login successful: ${email}`);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        cart: user.cart,
        wishlist: user.wishlist
      }
    });
  } catch (error) {
    console.error('❌ Login error:', error.message);
    next({
      status: 500,
      message: 'Authentication failed'
    });
  }
});

/**
 * GET /api/auth/me
 * Get current logged-in user (protected route)
 */
router.get('/me', verify, async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        cart: user.cart,
        wishlist: user.wishlist
      }
    });
  } catch (error) {
    next({
      status: 500,
      message: 'Failed to fetch user'
    });
  }
});

/**
 * POST /api/auth/logout
 * Logout user (frontend should delete token from localStorage)
 */
router.post('/logout', (req, res) => {
  console.log('👋 User logged out');
  
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

/**
 * PUT /api/auth/cart
 * Sync user cart
 */
router.put('/cart', verify, async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    user.cart = req.body.cart;
    await user.save();
    res.json({ success: true, cart: user.cart });
  } catch (error) {
    next({ status: 500, message: 'Failed to sync cart' });
  }
});

/**
 * PUT /api/auth/wishlist
 * Sync user wishlist
 */
router.put('/wishlist', verify, async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    user.wishlist = req.body.wishlist;
    await user.save();
    res.json({ success: true, wishlist: user.wishlist });
  } catch (error) {
    next({ status: 500, message: 'Failed to sync wishlist' });
  }
});

/**
 * POST /api/auth/promote-to-admin
 * Promote a user to admin (for troubleshooting - only works if no admins exist)
 * Body: { email: string }
 */
router.post('/promote-to-admin', async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // Check if any admin already exists
    const adminExists = await User.findOne({ role: 'admin' });
    if (adminExists) {
      return res.status(403).json({
        success: false,
        message: 'An admin account already exists. This endpoint can only be used for initial setup.'
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Promote to admin
    user.role = 'admin';
    await user.save();

    console.log(`✅ User promoted to admin: ${email}`);

    res.json({
      success: true,
      message: `✅ User ${email} has been promoted to admin!`,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('❌ Error promoting user:', error.message);
    next({
      status: 500,
      message: 'Failed to promote user to admin',
      details: error.message
    });
  }
});

export default router;
