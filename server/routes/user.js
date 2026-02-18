import express from 'express';
import User from '../models/User.js';
import { verify } from '../middleware/auth.js';

const router = express.Router();

// Middleware to verify user is authenticated
router.use(verify);

// ==================== ADDRESSES ====================

// Get all addresses
router.get('/addresses', async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ success: true, addresses: user.addresses || [] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Add new address
router.post('/addresses', async (req, res) => {
  try {
    const { name, email, phone, address, city, state, zip, isDefault } = req.body;

    if (!address) {
      return res.status(400).json({ success: false, message: 'Address is required' });
    }

    const user = await User.findById(req.userId);

    // If marking as default, unmark others
    if (isDefault) {
      user.addresses.forEach(addr => addr.isDefault = false);
    }

    const newAddress = { name, email, phone, address, city, state, zip, isDefault: isDefault || false };
    user.addresses.push(newAddress);
    await user.save();

    res.json({ success: true, message: 'Address added', addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update address
router.put('/addresses/:addressId', async (req, res) => {
  try {
    const { name, email, phone, address, city, state, zip, isDefault } = req.body;
    const user = await User.findById(req.userId);

    const addressIndex = user.addresses.findIndex(a => a._id.toString() === req.params.addressId);
    if (addressIndex === -1) {
      return res.status(404).json({ success: false, message: 'Address not found' });
    }

    if (isDefault) {
      user.addresses.forEach(addr => addr.isDefault = false);
    }

    user.addresses[addressIndex] = {
      ...user.addresses[addressIndex].toObject(),
      name: name || user.addresses[addressIndex].name,
      email: email || user.addresses[addressIndex].email,
      phone: phone || user.addresses[addressIndex].phone,
      address: address || user.addresses[addressIndex].address,
      city: city || user.addresses[addressIndex].city,
      state: state || user.addresses[addressIndex].state,
      zip: zip || user.addresses[addressIndex].zip,
      isDefault: isDefault !== undefined ? isDefault : user.addresses[addressIndex].isDefault
    };

    await user.save();
    res.json({ success: true, message: 'Address updated', addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete address
router.delete('/addresses/:addressId', async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.addresses = user.addresses.filter(a => a._id.toString() !== req.params.addressId);
    await user.save();
    res.json({ success: true, message: 'Address deleted', addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==================== CART ====================

// Get cart
router.get('/cart', async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ success: true, cart: user.cart || [] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Add to cart
router.post('/cart', async (req, res) => {
  try {
    const { productId, productName, price, quantity, image } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ success: false, message: 'Product ID and quantity required' });
    }

    const user = await User.findById(req.userId);
    
    // Check if item already in cart
    const cartItem = user.cart.find(item => item.productId === productId);
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      user.cart.push({ productId, productName, price, quantity, image });
    }

    await user.save();
    res.json({ success: true, message: 'Item added to cart', cart: user.cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update cart item quantity
router.put('/cart/:cartItemId', async (req, res) => {
  try {
    const { quantity } = req.body;
    const user = await User.findById(req.userId);

    const cartItem = user.cart.find(item => item._id.toString() === req.params.cartItemId);
    if (!cartItem) {
      return res.status(404).json({ success: false, message: 'Cart item not found' });
    }

    if (quantity <= 0) {
      user.cart = user.cart.filter(item => item._id.toString() !== req.params.cartItemId);
    } else {
      cartItem.quantity = quantity;
    }

    await user.save();
    res.json({ success: true, message: 'Cart updated', cart: user.cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Remove from cart
router.delete('/cart/:cartItemId', async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.cart = user.cart.filter(item => item._id.toString() !== req.params.cartItemId);
    await user.save();
    res.json({ success: true, message: 'Item removed from cart', cart: user.cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Clear cart
router.delete('/cart', async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.cart = [];
    await user.save();
    res.json({ success: true, message: 'Cart cleared', cart: [] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==================== WISHLIST ====================

// Get wishlist
router.get('/wishlist', async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ success: true, wishlist: user.wishlist || [] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Add to wishlist
router.post('/wishlist', async (req, res) => {
  try {
    const { productId, productName, price, image } = req.body;

    if (!productId) {
      return res.status(400).json({ success: false, message: 'Product ID required' });
    }

    const user = await User.findById(req.userId);
    
    // Check if already in wishlist
    if (user.wishlist.some(item => item.productId === productId)) {
      return res.status(400).json({ success: false, message: 'Already in wishlist' });
    }

    user.wishlist.push({ productId, productName, price, image });
    await user.save();
    res.json({ success: true, message: 'Item added to wishlist', wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Remove from wishlist
router.delete('/wishlist/:wishlistItemId', async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.wishlist = user.wishlist.filter(item => item._id.toString() !== req.params.wishlistItemId);
    await user.save();
    res.json({ success: true, message: 'Item removed from wishlist', wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==================== PREFERENCES ====================

// Get user preferences
router.get('/preferences', async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const preferences = user.preferences || { theme: 'light', accentColor: 'blue' };
    res.json({ success: true, theme: preferences.theme, accentColor: preferences.accentColor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Save user preferences
router.post('/preferences', async (req, res) => {
  try {
    const { theme, accentColor } = req.body;

    if (!['light', 'dark'].includes(theme) || !['blue', 'orange', 'purple', 'green', 'red'].includes(accentColor)) {
      return res.status(400).json({ success: false, message: 'Invalid preferences' });
    }

    const user = await User.findById(req.userId);
    user.preferences = { theme, accentColor };
    await user.save();

    res.json({ success: true, message: 'Preferences saved', preferences: user.preferences });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==================== PROFILE MANAGEMENT ====================

// Get user profile
router.get('/profile', async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        gender: user.gender || '',
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update user profile (name, email, phone, gender)
router.put('/profile', async (req, res) => {
  try {
    const { name, email, phone, gender } = req.body;
    const user = await User.findById(req.userId);

    // Validation
    if (name && name.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Name cannot be empty' });
    }

    if (name && name.length > 50) {
      return res.status(400).json({ success: false, message: 'Name cannot exceed 50 characters' });
    }

    // Email validation and uniqueness
    if (email) {
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email format' });
      }

      // Check if email is already used by another user
      const existingUser = await User.findOne({ email: email.toLowerCase(), _id: { $ne: req.userId } });
      if (existingUser) {
        return res.status(409).json({ success: false, message: 'Email already in use' });
      }
    }

    // Phone validation (optional, basic format)
    if (phone) {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (!phoneRegex.test(phone)) {
        return res.status(400).json({ success: false, message: 'Invalid phone number format' });
      }
    }

    // Gender validation
    if (gender && !['male', 'female', 'other', ''].includes(gender)) {
      return res.status(400).json({ success: false, message: 'Invalid gender value' });
    }

    // Update fields
    if (name) user.name = name.trim();
    if (email) user.email = email.toLowerCase();
    if (phone !== undefined) user.phone = phone || '';
    if (gender !== undefined) user.gender = gender || '';

    await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        gender: user.gender || ''
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update password
router.post('/change-password', async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'New passwords do not match' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({ success: false, message: 'New password must be different from current password' });
    }

    // Get user with password
    const user = await User.findById(req.userId).select('+password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Verify current password
    const isPasswordValid = await user.comparePassword(currentPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect' });
    }

    // Update password (will be hashed by schema pre-save hook)
    user.password = newPassword;
    await user.save();

    res.json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
